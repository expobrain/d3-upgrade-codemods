import { isMemberExpression, buildMemberExpressionFromLiteral } from './utils'


const scaleMap = [
  ['d3.scale.linear',     buildMemberExpressionFromLiteral('d3.scaleLinear')],
  ['d3.scale.sqrt',       buildMemberExpressionFromLiteral('d3.scaleSqrt')],
  ['d3.scale.pow',        buildMemberExpressionFromLiteral('d3.scalePow')],
  ['d3.scale.log',        buildMemberExpressionFromLiteral('d3.scaleLog')],
  ['d3.scale.quantize',   buildMemberExpressionFromLiteral('d3.scaleQuantize')],
  ['d3.scale.threshold',  buildMemberExpressionFromLiteral('d3.scaleThreshold')],
  ['d3.scale.quantile',   buildMemberExpressionFromLiteral('d3.scaleQuantile')],
  ['d3.scale.identity',   buildMemberExpressionFromLiteral('d3.scaleIdentity')],
  ['d3.scale.ordinal',    buildMemberExpressionFromLiteral('d3.scaleOrdinal')],
  ['d3.time.scale.utc',   buildMemberExpressionFromLiteral('d3.scaleUtc')],
  ['d3.time.scale',       buildMemberExpressionFromLiteral('d3.scaleTime')],
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
 */
export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  for (let i = 0; i < scaleMap.length; i++) {
    const [literal, nodeBuilder] = scaleMap[i]

    root
      .find(j.MemberExpression)
      .filter((path) => isMemberExpression(path.node, literal))
      .replaceWith(() => nodeBuilder(j))
  }

  return root.toSource()
}
