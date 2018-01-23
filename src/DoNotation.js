import { types as t } from "babel-core";

export const identifier = "join";

export const DoNotation = {
  CallExpression(path) {
    const body = path.get("arguments");
    if (body.length < 1) throw ast.buildCodeFrameError("At least one argument");
    body.forEach(ast => {
      if (ast.isSpreadElement())
        throw ast.buildCodeFrameError("Does not support spread operator");
    });
    const first = body[0];
    const rest = body.slice(1);
    const joiner = path.scope.generateUidIdentifier("joiner");
    const createChain = memo => {
      const item = rest.shift();
      if (!item) return memo.node;
      const isBinding = memo.isAssignmentExpression();
      const carry = isBinding ? [memo.node.left] : [];
      const prev = isBinding ? memo.node.right : memo.node;
      return t.callExpression(joiner, [
        prev,
        t.arrowFunctionExpression(carry, createChain(item))
      ]);
    };
    path.replaceWith(t.arrowFunctionExpression([joiner], createChain(first)));
  }
};
