import { types as t } from "babel-core";

export const SymbolicExpression = {
  identifier: "symbolic",
  CallExpression(path) {
    const body = path.get("arguments")[0];
    notSpreadElement(body);
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

const notSpreadElement = ast => {
  if (ast.isSpreadElement())
    throw path.buildCodeFrameError("Does not support spread operator");
};
