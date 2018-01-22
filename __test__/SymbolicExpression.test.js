import { transform } from "babel-core";
import plugin from "../src";

describe("SymbolicExpression", () => {
  test("works", () => {
    const { code } = transform(`symbolic(x+y)`, {
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
