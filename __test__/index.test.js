import { transform } from "babel-core";
import plugin from "../src";

describe("SymbolicExpression", () => {
  test("works", () => {
    const { code } = transform(`symbolic(x+y)({ x: 4, y: 1 })`, {
      plugins: [plugin]
    });
    expect(eval(code)).toBe(5);
  });
});
