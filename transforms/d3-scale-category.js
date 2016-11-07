import { isMemberExpression, isIdentifier } from './utils'


const identifiers = [
  'category10',
  'category20',
  'category20b',
  'category20c'
]


const isScaleCategory = (node) => {
  if (node.type !== 'CallExpression') { return false }
  if (node.callee.type !== 'MemberExpression') { return false }

  return isMemberExpression(node.callee.object, 'd3.scale')
    && node.callee.property.type === 'Identifier'
    && identifiers.indexOf(node.callee.property.name) > -1
}


/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#scales-d3-scale
 *
 * d3.scale.category10 ↦ d3.schemeCategory10
 * d3.scale.category20 ↦ d3.schemeCategory20
 * d3.scale.category20b ↦ d3.schemeCategory20b
 * d3.scale.category20c ↦ d3.schemeCategory20c
 */
export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  // Transform calls to d3.scale.category*().range()
  root
    .find(j.CallExpression)
    .filter((path) => {
      const callee = path.node.callee

      return  callee.type === 'MemberExpression'
           && isScaleCategory(callee.object)
           && isIdentifier(callee.property, 'range')
    })
    .replaceWith((path) => { return path.node.callee.object })

  // Transform d3.scale.category*
  root
    .find(j.CallExpression)
    .filter((path) => { return isScaleCategory(path.node) })
    .replaceWith((path) => {
      const name = 'scheme'
                 + path.node.callee.property.name[0].toUpperCase()
                 + path.node.callee.property.name.slice(1)

      const object = j.identifier('d3')
      const property = j.identifier(name)

      return j.memberExpression(object, property)
    })

  return root.toSource()
}
