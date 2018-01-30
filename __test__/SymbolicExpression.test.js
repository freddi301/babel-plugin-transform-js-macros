import { transform } from "babel-core";
import plugin from "../src";
import { SymbolicExpression } from "../src/SymbolicExpression";

describe("SymbolicExpression", () => {
  test("works", () => {
    const { code } = transform(`(${SymbolicExpression.identifier}, x + y)`, {
      plugins: [plugin]
    });
    expect(code).toBe(`({\n  x,\n  y\n}) => x + y;`);
    expect(eval(code)({ x: 4, y: 1 })).toBe(5);
  });
});
