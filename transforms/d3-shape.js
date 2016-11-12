import { isMemberExpression, buildMemberExpressionFromLiteral } from './common/utils.js'


const removedFeature = (featureLiteral) => (j) => {
  const callee = j.identifier('Error')
  const arguments_ = [j.literal(`${featureLiteral} has been removed`)]
  const argument = j.callExpression(callee, arguments_)
  const body = j.throwStatement(argument)

  return j.functionExpression(null, [], j.blockStatement([body]), false, false)
}


const shapeMap = [
  ['d3.svg.line.radial',      buildMemberExpressionFromLiteral('d3.radialLine')],
  ['d3.svg.line',             buildMemberExpressionFromLiteral('d3.line')],
  ['d3.svg.area.radial',      buildMemberExpressionFromLiteral('d3.radialArea')],
  ['d3.svg.area',             buildMemberExpressionFromLiteral('d3.area')],
  ['d3.svg.arc',              buildMemberExpressionFromLiteral('d3.arc')],
  ['d3.svg.symbol',           buildMemberExpressionFromLiteral('d3.symbol')],
  ['d3.svg.symbolTypes',      buildMemberExpressionFromLiteral('d3.symbolTypes')],
  ['d3.layout.pie',           buildMemberExpressionFromLiteral('d3.pie')],
  ['d3.layout.stack',         buildMemberExpressionFromLiteral('d3.stack')],
  ['d3.svg.diagonal.radial',  removedFeature('d3.svg.diagonal.radial')],
  ['d3.svg.diagonal',         removedFeature('d3.svg.diagonal')],
]


/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#shapes-d3-shape
 *
 * d3.svg.line ↦ d3.line
 * d3.svg.line.radial ↦ d3.radialLine
 * d3.svg.area ↦ d3.area
 * d3.svg.area.radial ↦ d3.radialArea
 * d3.svg.arc ↦ d3.arc
 * d3.svg.symbol ↦ d3.symbol
 * d3.svg.symbolTypes ↦ d3.symbolTypes
 * d3.layout.pie ↦ d3.pie
 * d3.layout.stack ↦ d3.stack
 * d3.svg.diagonal ↦ REMOVED (see d3/d3-shape#27)
 * d3.svg.diagonal.radial ↦ REMOVED
 */
export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  for (let i = 0; i < shapeMap.length; i++) {
    const [literal, nodeBuilder] = shapeMap[i]

    root
      .find(j.MemberExpression)
      .filter((path) => isMemberExpression(path.node, literal))
      .replaceWith(() => nodeBuilder(j))
  }

  return root.toSource()
}
