import ts from 'typescript';

/**
 * Get a function declaration from a TS node by resolving its symbol.
 */
export function getFunctionDeclarationFromNode(
  checker: ts.TypeChecker,
  node: ts.Node,
): ts.FunctionLikeDeclarationBase | null {
  return getFunctionDeclarationFromSymbol(checker.getSymbolAtLocation(node));
}

/**
 * Get the first function declaration with a body from a symbol.
 */
export function getFunctionDeclarationFromSymbol(
  symbol?: ts.Symbol,
): ts.FunctionLikeDeclarationBase | null {
  if (!symbol?.declarations || symbol.declarations.length === 0) {
    return null;
  }

  const decl = symbol.declarations.find(
    (x): x is ts.FunctionLikeDeclarationBase =>
      isFunctionLikeDeclarationBase(x) && !!x.body,
  );
  return decl ?? null;
}

/**
 * Check if a node is a function-like declaration (function, arrow, function expression).
 */
export function isFunctionLikeDeclarationBase(
  node: ts.Node,
): node is ts.FunctionLikeDeclarationBase {
  switch (node.kind) {
    case ts.SyntaxKind.FunctionDeclaration:
    case ts.SyntaxKind.FunctionExpression:
    case ts.SyntaxKind.ArrowFunction:
    case ts.SyntaxKind.MethodDeclaration:
      return true;
  }
  return false;
}

/**
 * Walk a subtree and collect all nodes matching a given SyntaxKind.
 */
export function extractNodesBySyntaxKind<TNode extends ts.Node>(
  node: ts.Node,
  kind: ts.SyntaxKind,
): TNode[] {
  return extractNodes<TNode>(node, n => n.kind === kind);
}

/**
 * Walk a subtree and collect all nodes matching a predicate.
 */
export function extractNodes<TNode extends ts.Node>(
  node: ts.Node,
  predicate: (n: ts.Node) => boolean,
): TNode[] {
  const nodes: TNode[] = [];
  const visit = (n: ts.Node) => {
    if (predicate(n)) {
      nodes.push(n as TNode);
    }
    ts.forEachChild(n, visit);
  };
  visit(node);
  return nodes;
}

/**
 * Check if a binary expression is an assignment (=, +=, -=, etc.).
 */
export function isAssignmentExpression(
  node: ts.Node,
): node is ts.BinaryExpression {
  return ts.isBinaryExpression(node) && isAssignmentOperator(node.operatorToken.kind);
}

/**
 * Check if a SyntaxKind is an assignment operator.
 */
export function isAssignmentOperator(kind: ts.SyntaxKind): boolean {
  switch (kind) {
    case ts.SyntaxKind.EqualsToken:
    case ts.SyntaxKind.PlusEqualsToken:
    case ts.SyntaxKind.MinusEqualsToken:
    case ts.SyntaxKind.CaretEqualsToken:
    case ts.SyntaxKind.SlashEqualsToken:
    case ts.SyntaxKind.AsteriskEqualsToken:
    case ts.SyntaxKind.PercentEqualsToken:
    case ts.SyntaxKind.AmpersandEqualsToken:
    case ts.SyntaxKind.BarEqualsToken:
    case ts.SyntaxKind.LessThanLessThanEqualsToken:
    case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
    case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
    case ts.SyntaxKind.QuestionQuestionEqualsToken:
    case ts.SyntaxKind.AmpersandAmpersandEqualsToken:
    case ts.SyntaxKind.BarBarEqualsToken:
      return true;
  }
  return false;
}

/**
 * Check if a node introduces a new variable scope.
 */
export function doesNodeCreateNewScope(node: ts.Node): boolean {
  return (
    ts.isClassDeclaration(node) ||
    ts.isFunctionDeclaration(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isBlock(node) ||
    ts.isCatchClause(node)
  );
}
