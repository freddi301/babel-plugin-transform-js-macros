import { transform } from "babel-core";
import plugin from "../src";

describe("BlockReduce", () => {
  test("works", () => {
    const { code } = transform(`squash(thenize); { a; b; c }`, {
      plugins: [plugin]
    });
  });
});
