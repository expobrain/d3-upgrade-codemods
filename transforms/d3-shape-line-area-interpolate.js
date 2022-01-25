import {
  isMemberExpression,
  isCallExpression,
  buildMemberExpressionFromLiteral,
} from "./common/utils.js";

const curveMap = {
  linear: buildMemberExpressionFromLiteral("d3.curveLinear"),
  "linear-closed": buildMemberExpressionFromLiteral("d3.curveLinearClosed"),
  step: buildMemberExpressionFromLiteral("d3.curveStep"),
  "step-before": buildMemberExpressionFromLiteral("d3.curveStepBefore"),
  "step-after": buildMemberExpressionFromLiteral("d3.curveStepAfter"),
  basis: buildMemberExpressionFromLiteral("d3.curveBasis"),
  "basis-open": buildMemberExpressionFromLiteral("d3.curveBasisOpen"),
  "basis-closed": buildMemberExpressionFromLiteral("d3.curveBasisClosed"),
  bundle: buildMemberExpressionFromLiteral("d3.curveBundle"),
  cardinal: buildMemberExpressionFromLiteral("d3.curveCardinal"),
  "cardinal-open": buildMemberExpressionFromLiteral("d3.curveCardinalOpen"),
  "cardinal-closed": buildMemberExpressionFromLiteral("d3.curveCardinalClosed"),
  monotone: buildMemberExpressionFromLiteral("d3.curveMonotoneX"),
};

/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#shapes-d3-shape
 *
 * d3.[line|area].interpolate() ↦ d3.[line|area].curve()
 *
 * line.curve and area.curve now take a function which instantiates a curve for a given context,
 * rather than a string. The full list of equivalents:
 *
 * linear ↦ d3.curveLinear
 * linear-closed ↦ d3.curveLinearClosed
 * step ↦ d3.curveStep
 * step-before ↦ d3.curveStepBefore
 * step-after ↦ d3.curveStepAfter
 * basis ↦ d3.curveBasis
 * basis-open ↦ d3.curveBasisOpen
 * basis-closed ↦ d3.curveBasisClosed
 * bundle ↦ d3.curveBundle
 * cardinal ↦ d3.curveCardinal
 * cardinal-open ↦ d3.curveCardinalOpen
 * cardinal-closed ↦ d3.curveCardinalClosed
 * monotone ↦ d3.curveMonotoneX
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
          name: "interpolate",
        },
      },
    })
    .filter((path) => {
      const queue = [path.node];

      while (queue.length) {
        const node = queue.shift();

        if (
          isMemberExpression(node, "d3.line") ||
          isCallExpression(path, "d3.line") ||
          isMemberExpression(node, "d3.area") ||
          isCallExpression(path, "d3.area")
        ) {
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
      const callee = path.node.callee;
      const arguments_ = path.node.arguments.slice();

      // Replace interpolate() with curve()
      callee.property = j.identifier("curve");

      // Replace curve type literal with function
      if (arguments_.length) {
        const value = arguments_[0].value;
        const newArgument = curveMap[value](j);

        if (newArgument) {
          arguments_[0] = newArgument;
        }
      }

      // Return call expression
      return j.callExpression(callee, arguments_);
    });

  return root.toSource();
}
