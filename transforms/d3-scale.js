import { isIdentifier, isMemberExpression, buildMemberExpressionFromLiteral } from './utils'


const scaleMap = [
  ['d3.scale.linear',       buildMemberExpressionFromLiteral('d3.scaleLinear')],
  ['d3.scale.sqrt',         buildMemberExpressionFromLiteral('d3.scaleSqrt')],
  ['d3.scale.pow',          buildMemberExpressionFromLiteral('d3.scalePow')],
  ['d3.scale.log',          buildMemberExpressionFromLiteral('d3.scaleLog')],
  ['d3.scale.quantize',     buildMemberExpressionFromLiteral('d3.scaleQuantize')],
  ['d3.scale.threshold',    buildMemberExpressionFromLiteral('d3.scaleThreshold')],
  ['d3.scale.quantile',     buildMemberExpressionFromLiteral('d3.scaleQuantile')],
  ['d3.scale.identity',     buildMemberExpressionFromLiteral('d3.scaleIdentity')],
  ['d3.scale.ordinal',      buildMemberExpressionFromLiteral('d3.scaleOrdinal')],
  ['d3.time.scale.utc',     buildMemberExpressionFromLiteral('d3.scaleUtc')],
  ['d3.time.scale',         buildMemberExpressionFromLiteral('d3.scaleTime')],

  ['d3.time.format.utc',    buildMemberExpressionFromLiteral('d3.utcFormat')],
  ['d3.time.format.iso',    buildMemberExpressionFromLiteral('d3.isoFormat')],
  ['d3.time.format',        buildMemberExpressionFromLiteral('d3.timeFormat')],
]

const scaleCategoryMap = [
  ['d3.scale.category10',   buildMemberExpressionFromLiteral('d3.schemeCategory10')],
  ['d3.scale.category20',   buildMemberExpressionFromLiteral('d3.schemeCategory20')],
  ['d3.scale.category20b',  buildMemberExpressionFromLiteral('d3.schemeCategory20b')],
  ['d3.scale.category20c',  buildMemberExpressionFromLiteral('d3.schemeCategory20c')],
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
 * d3.time.scale ↦ d3.scaleTime
 * d3.time.scale.utc ↦ d3.scaleUtc
 *
 * d3.scale.category10 ↦ d3.schemeCategory10
 * d3.scale.category20 ↦ d3.schemeCategory20
 * d3.scale.category20b ↦ d3.schemeCategory20b
 * d3.scale.category20c ↦ d3.schemeCategory20c
 *
 * d3.time.format ↦ d3.timeFormat
 * d3.time.format.utc ↦ d3.utcFormat
 * d3.time.format.iso ↦ d3.isoFormat
 */
export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  // Transform d3.scale
  scaleMap.forEach((item) => {
    const [literal, nodeBuilder] = item

    root
      .find(j.MemberExpression)
      .filter((path) => isMemberExpression(path.node, literal))
      .replaceWith(() => nodeBuilder(j))
  })

  // Transform d3.scale.category*
  scaleCategoryMap.forEach((item) => {
    const [literal, nodeBuilder] = item

    // Remove range() calls
    root
      .find(j.CallExpression)
      .filter((path) => isMemberExpression(path.node.callee, literal))
      .map((path) => path.parent)
      .filter((path) => {
        return path.node.type === 'MemberExpression'
            && isIdentifier(path.node.property, 'range')
      })
      .replaceWith((path) => path.node.object.callee)
      .map((path) => path.parent)
      .filter((path) => path.node.type === 'CallExpression')
      .replaceWith((path) => path.node.callee)

    // Transform call and member expressions
    root
      .find(j.CallExpression)
      .filter((path) => isMemberExpression(path.node.callee, literal))
      .replaceWith(() => nodeBuilder(j))
    root
      .find(j.MemberExpression)
      .filter((path) => isMemberExpression(path.node, literal))
      .replaceWith(() => nodeBuilder(j))
  })

  return root.toSource()
}
