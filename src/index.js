import { SymbolicExpression } from "./SymbolicExpression";
import { DoNotation } from "./DoNotation";

export const Dispatcher = {
  SequenceExpression(path) {
    const macro = path.get("expressions")[0];
    if (macro.isIdentifier({ name: SymbolicExpression.identifier }))
      SymbolicExpression.SequenceExpression(path);
    else if (macro.isIdentifier({ name: DoNotation.identifier }))
      DoNotation.SequenceExpression(path);
  }
};

export default function() {
  return { visitor: Dispatcher };
}
