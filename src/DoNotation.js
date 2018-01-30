import { types as t } from "babel-core";

export const DoNotation = {
  identifier: "join",
  SequenceExpression(path) {
    const body = path.get("expressions").slice(1);
    validateArguments(body);
    const first = body[0];
    const rest = body.slice(1);
    const joiner = path.scope.generateUidIdentifier("joiner");
    const createChain = memo => {
      const item = rest.shift();
      if (!item) return memo.node;
      const isBinding = memo.isAssignmentExpression();
      const carry = isBinding ? [memo.node.left] : [];
      const prev = isBinding ? memo.node.right : memo.node;
      const next = t.arrowFunctionExpression(carry, createChain(item));
      return t.callExpression(joiner, [prev, next]);
    };
    const chain = t.arrowFunctionExpression([joiner], createChain(first));
    path.replaceWith(chain);
  }
};

const validateArguments = body => {
  if (body.length < 1) throw body.buildCodeFrameError("At least one argument");
};
