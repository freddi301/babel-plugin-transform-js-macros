import { types as t } from "babel-core";

export const SymbolicExpression = {
  identifier: "symbolic",
  SequenceExpression(path) {
    const body = path.get("expressions")[1];
    const freeVars = new Set();
    body.traverse(CollectFreeVariables, { freeVars });
    const makeParam = name =>
      t.objectProperty(t.identifier(name), t.identifier(name), false, true);
    const param = t.objectPattern(Array.from(freeVars).map(makeParam));
    const arrow = t.arrowFunctionExpression([param], body.node);
    path.replaceWith(arrow);
  }
};

const CollectFreeVariables = {
  Identifier(path) {
    const isFree = !path.isReferencedIdentifier();
    this.freeVars.add(path.node.name);
  }
};
