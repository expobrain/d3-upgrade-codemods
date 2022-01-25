export const isMemberExpression = (node, literal) => {
  if (node.type !== "MemberExpression") {
    return false;
  }

  const tokens = literal.split(".");
  const prefix = tokens.slice(0, tokens.length - 1);
  const name = tokens[tokens.length - 1];
  let object;

  if (prefix.length > 1) {
    object = isMemberExpression(node.object, prefix.join("."));
  } else {
    object = isIdentifier(node.object, prefix[0]);
  }

  return object && isIdentifier(node.property, name);
};

export const isIdentifier = (node, name) => {
  return node.type === "Identifier" && node.name === name;
};

export const buildMemberExpressionFromLiteral = (literal) => (j) => {
  const tokens = literal.split(".");

  if (tokens.length < 2) {
    return j.identifier(tokens[0]);
  }

  const literalPrefix = tokens.slice(0, tokens.length - 1).join(".");
  const object = buildMemberExpressionFromLiteral(literalPrefix)(j);
  const property = j.identifier(tokens[tokens.length - 1]);

  return j.memberExpression(object, property);
};

export const isCallExpression = (node, literal) => {
  if (node.type !== "CallExpression") {
    return false;
  }

  return isMemberExpression(node.callee, literal);
};
