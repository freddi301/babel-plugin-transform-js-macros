import fs from "fs";
import { transform } from "babel-core";
import plugin from "../src";

describe("README.md", () => {
  test("no runtime errors in examples", () => {
    const readmeCode = String(fs.readFileSync("README.md"))
      .match(/```javascript[^`]+```/gm)
      .map(block => block.slice(13, -3))
      .join("");
    const { code } = transform(readmeCode, {
      plugins: [plugin]
    });
    eval(code);
  });
});
