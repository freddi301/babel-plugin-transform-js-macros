import fs from "fs";
import { promisify } from "util";
import { transform } from "babel-core";
import plugin from "../src";

describe("README.md", () => {
  test("no runtime errors in examples", async () => {
    const readmeCode = String(await promisify(fs.readFile)("README.md"))
      .match(/```javascript[^`]+```/gm)
      .map(block => block.slice(13, -3))
      .join("");
    const { code } = transform(readmeCode, {
      plugins: [plugin]
    });
    eval(code);
    debugger;
  });
});
