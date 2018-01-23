import { SymbolicExpression } from "./SymbolicExpression";
import { DoNotation } from "./DoNotation";

export const Dispatcher = {
  CallExpression(path) {
    const callee = path.get("callee");
    if (callee.isIdentifier({ name: SymbolicExpression.identifier }))
      SymbolicExpression.CallExpression(path);
    else if (callee.isIdentifier({ name: DoNotation.identifier }))
      DoNotation.CallExpression(path);
  }
};

export default function() {
  return { visitor: Dispatcher };
}
