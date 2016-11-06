export const isMemberExpression = (node, literal) => {
    if (node.type !== 'MemberExpression') {
      return false
    }

    const tokens = literal.split('.')
    const prefix = tokens.slice(0, tokens.length - 1)
    const name = tokens[tokens.length - 1]
    let object

    if (prefix.length > 1) {
      object = isMemberExpression(node.object, prefix.join('.'))
    } else {
      object = isIdentifier(node.object, prefix[0])
    }

    return object && isIdentifier(node.property, name)
}

export const isIdentifier = (node, name) => {
  return node.type === 'Identifier' && node.name === name
}
