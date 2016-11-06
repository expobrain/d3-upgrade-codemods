const identifiers = [
  'linear',
  'sqrt',
  'pow',
  'log',
  'quantize',
  'threshold',
  'quantile',
  'identity',
  'ordinal',
]

/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#scales-d3-scale
 *
 * d3.scale.linear ↦ d3.scaleLinear
 * d3.scale.sqrt ↦ d3.scaleSqrt
 * d3.scale.pow ↦ d3.scalePow
 * d3.scale.log ↦ d3.scaleLog
 * d3.scale.quantize ↦ d3.scaleQuantize
 * d3.scale.threshold ↦ d3.scaleThreshold
 * d3.scale.quantile ↦ d3.scaleQuantile
 * d3.scale.identity ↦ d3.scaleIdentity
 * d3.scale.ordinal ↦ d3.scaleOrdinal
 */
export default function transformer(file, api) {
  const j = api.jscodeshift

  return j(file.source)
    .find(j.MemberExpression)
    .filter((path) => {
      const object = path.node.object
      const property = path.node.property

      return object.type === "Identifier" && object.name === 'd3'
          && property.type === "Identifier" && property.name === 'scale'
    })
    .filter((path) => {
      return path.parent.node.type === 'MemberExpression'
          && path.parent.node.property.type === 'Identifier'
          && identifiers.indexOf(path.parent.node.property.name) !== -1
    })
    .map((path) => path.parent)
    .replaceWith((path) => {
      const propertyName = path.node.object.property.name
                           + path.node.property.name[0].toUpperCase()
                           + path.node.property.name.slice(1)

      const object = j.identifier('d3')
      const property = j.identifier(propertyName)

      return j.memberExpression(object, property)
    })
    .toSource()
}
