import { transform } from "babel-core";
import plugin from "../src";
import { identifier } from "../src/SymbolicExpression";

describe("SymbolicExpression", () => {
  test("works", () => {
    const { code } = transform(`${identifier}(x+y)`, {
      plugins: [plugin]
    });
    expect(code).toBe(`({\n  x,\n  y\n}) => x + y;`);
    expect(eval(code)({ x: 4, y: 1 })).toBe(5);
  });
  // TODO
  if (false)
    test("nested", () => {
      const { code } = transform("symbolic(symbolic(x => y + x)({ y: z }))", {
        plugins: [plugin]
      });
      expect(code).toBe("");
    });
});
