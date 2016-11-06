import { isMemberExpression } from './utils'


/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#time-formats-d3-time-format
 *
 * d3.time.scale ↦ d3.scaleTime
 * d3.time.scale.utc ↦ d3.scaleUtc
 */
export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  // d3.time.scale.utc ↦ d3.scaleUtc
  root
    .find(j.MemberExpression)
    .filter((path) => { return isMemberExpression(path.node, 'd3.time.scale.utc') })
    .replaceWith(() => {
      const object = j.identifier('d3')
      const property = j.identifier('scaleUtc')

      return j.memberExpression(object, property)
    })

  // d3.time.scale ↦ d3.scaleTime
  root
    .find(j.MemberExpression)
    .filter((path) => { return isMemberExpression(path.node, 'd3.time.scale') })
    .replaceWith(() => {
      const object = j.identifier('d3')
      const property = j.identifier('scaleTime')

      return j.memberExpression(object, property)
    })

  return root.toSource()
}
