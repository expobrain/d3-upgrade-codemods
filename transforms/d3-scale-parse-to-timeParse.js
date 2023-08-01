import { isCallExpression } from "./common/utils.js";

/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#scales-d3-scale
 *
 * d3.timeFormat(<fmt>).parse ↦ d3.timeParse(<fmt>)
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.MemberExpression, {
      property: {
        type: "Identifier",
        name: "parse",
      },
    })
    .filter((path) => isCallExpression(path.node.object, "d3.timeFormat"))
    .replaceWith((path) => {
      const callee = j.memberExpression(
        path.node.object.callee.object,
        j.identifier("timeParse"),
      );
      const callExpression = j.callExpression(
        callee,
        path.node.object.arguments,
      );

      callExpression.callee.property = j.identifier("timeParse");

      return callExpression;
    });

  return root.toSource();
}
