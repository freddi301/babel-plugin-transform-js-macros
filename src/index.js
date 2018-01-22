import { SymbolicExpression } from "./SymbolicExpression";
import { BlockReduce } from "./BlockReduce";

export const Dispatcher = {
  CallExpression(path) {
    const callee = path.get("callee");
    if (callee.isIdentifier({ name: "symbolic" }))
      SymbolicExpression.CallExpression(path);
    else if (callee.isIdentifier({ name: "blockReduce" }))
      BlockReduce.CallExpression(path);
  }
};

export default function() {
  return { visitor: Dispatcher };
}
