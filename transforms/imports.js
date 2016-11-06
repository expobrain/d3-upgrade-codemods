import { isIdentifier } from './utils'

/**
 * import d3 from 'd3' ↦ import * as d3 from 'd3'
 */
export default function transformer(file, api) {
  const j = api.jscodeshift

  return j(file.source)
    .find(j.ImportDefaultSpecifier)
    .filter((path) => { return isIdentifier(path.node.local, 'd3')})
    .replaceWith(() => {
      const local = j.identifier('d3')

      return j.importNamespaceSpecifier(local)
    })
    .toSource()
}
