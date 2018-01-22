import { types as t } from "babel-core";

const SymbolicExpression = {
  CallExpression(path) {
    if (!path.get("callee").isIdentifier({ name: "symbolic" })) return;
    const body = path.get("arguments")[0];
    if (body.isSpreadElement()) throw path.buildCodeFrameError("Does not support spread operator");
    const freeVars = new Set();
    body.traverse(CollectFreeVariables, { freeVars });
    const makeParam = name =>
      t.objectProperty(t.identifier(name), t.identifier(name));
    const param = t.objectPattern(Array.from(freeVars).map(makeParam));
    const arrow = t.arrowFunctionExpression([param], body.node, false);
    path.replaceWith(arrow);
  }
};

const CollectFreeVariables = {
  Identifier(path) {
    const isFree = !path.isReferencedIdentifier();
    this.freeVars.add(path.node.name);
  }
};

export default function() {
  return { visitor: SymbolicExpression };
}
