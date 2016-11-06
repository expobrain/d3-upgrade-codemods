import { isMemberExpression } from './utils'

/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#scales-d3-scale
 *
 * d3.time.format ↦ d3.timeFormat
 * d3.time.format.utc ↦ d3.utcFormat
 * d3.time.format.iso ↦ d3.isoFormat
 */
export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  root
    .find(j.MemberExpression)
    .filter((path) => {
      return isMemberExpression(path.node, 'd3.time.format.utc')
          || isMemberExpression(path.node, 'd3.time.format.iso')
    })
    .replaceWith((path) => {
      const name = path.node.property.name

      const object = j.identifier('d3')
      const property = j.identifier(`${name}Format`)

      return j.memberExpression(object, property)
  })

  root
    .find(j.MemberExpression)
    .filter((path) => { return isMemberExpression(path.node, 'd3.time.format') })
    .replaceWith(() => {
      const object = j.identifier('d3')
      const property = j.identifier('timeFormat')

      return j.memberExpression(object, property)
  })

  return root.toSource()
}
