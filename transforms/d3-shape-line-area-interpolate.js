import { isMemberExpression, isCallExpression } from './common/utils.js'

/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#shapes-d3-shape
 *
 * d3.[line|area].interpolate() ↦ d3.[line|area].curve()
 */
export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  root
    .find(j.MemberExpression, {
      property: {
        type: 'Identifier',
        name: 'interpolate'
      }
    })
    .filter((path) => {
      const queue = [path.node]

      while (queue.length) {
        const node = queue.shift()

        if (isMemberExpression(node, 'd3.line') || isCallExpression(path, 'd3.line')
            || isMemberExpression(node, 'd3.area') || isCallExpression(path, 'd3.area')) {
          return true

        } else {
          if (node.type === 'MemberExpression') {
            queue.push(node.object)
          } else if (node.type === 'CallExpression') {
            queue.push(node.callee)
          }
        }
      }

      return false
    })
    .replaceWith((path) => {
      const object = path.node.object
      const property = j.identifier('curve')

      return j.memberExpression(object, property)
    })

  return root.toSource()
}
