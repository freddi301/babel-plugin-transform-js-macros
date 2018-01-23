import {
  SymbolicExpression,
  identifier as SymbolicExpressionIdentifier
} from "./SymbolicExpression";
import { DoNotation, identifier as DoNotationIdentifier } from "./DoNotation";

export const Dispatcher = {
  CallExpression(path) {
    if (path.get("callee").isIdentifier({ name: SymbolicExpressionIdentifier }))
      SymbolicExpression.CallExpression(path);
    else if (path.get("callee").isIdentifier({ name: DoNotationIdentifier }))
      DoNotation.CallExpression(path);
  }
};

export default function() {
  return { visitor: Dispatcher };
}
