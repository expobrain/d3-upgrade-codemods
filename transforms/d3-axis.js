import { isCallExpression } from "./common/utils.js";

const orientationMap = {
  top: "axisTop",
  bottom: "axisBottom",
  left: "axisLeft",
  right: "axisRight",
};

/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#axes-d3-axis
 *
 * d3.svg.axis().scale(x).orient("bottom") ↦ d3.axisBottom(x)
 * d3.svg.axis().scale(x).orient("top") ↦ d3.axisTop(x)
 * d3.svg.axis().scale(x).orient("right") ↦ d3.axisRight(x)
 * d3.svg.axis().scale(x).orient("left") ↦ d3.axisLeft(x)
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.CallExpression, {
      callee: {
        type: "MemberExpression",
        property: {
          type: "Identifier",
          name: "orient",
        },
      },
      arguments: [
        {
          type: "Literal",
        },
      ],
    })
    .filter((path) =>
      orientationMap.hasOwnProperty(path.node.arguments[0].value)
    )
    .filter((path) => {
      const queue = [path.node];

      while (queue.length) {
        const node = queue.shift();

        if (isCallExpression(node, "d3.svg.axis")) {
          return true;
        } else {
          if (node.type === "MemberExpression") {
            queue.push(node.object);
          } else if (node.type === "CallExpression") {
            queue.push(node.callee);
          }
        }
      }

      return false;
    })
    .replaceWith((path) => {
      const queue = [path.node];
      const orientation = orientationMap[path.node.arguments[0].value];
      let scale;

      while (queue.length) {
        const node = queue.shift();

        // Drop orient() call
        if (
          node.type === "CallExpression" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "orient"
        ) {
          node.arguments = node.callee.object.arguments;
          node.callee = node.callee.object.callee;
        }

        // Get scale() arguments and drop call
        if (
          node.type === "CallExpression" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "scale"
        ) {
          scale = node.arguments[0];
          node.arguments = node.callee.object.arguments;
          node.callee = node.callee.object.callee;
        }

        // Replace d3.svg.axis() with d3.axis*(<scale>)
        if (isCallExpression(node, "d3.svg.axis")) {
          const object = j.identifier("d3");
          const property = j.identifier(orientation);

          node.callee = j.memberExpression(object, property);
          node.arguments = [scale];
        }

        // Traverse deeper the functions chain
        if (node.type === "MemberExpression") {
          queue.push(node.object);
        } else if (node.type === "CallExpression") {
          queue.push(node.callee);
        }
      }

      // Return modified node
      return path.node;
    });

  return root.toSource();
}
