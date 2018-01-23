import { transform } from "babel-core";
import plugin from "../src";
import { identifier } from "../src/DoNotation";
import { basename } from "path";

describe("DoNotation", () => {
  test("single element", () => {
    const { code } = transform(`${identifier}(a)`, {
      plugins: [plugin]
    });
    expect(code).toBe("_joiner => a;");
  });
  test("3 elements", () => {
    const { code } = transform(`${identifier}(a, b, c)`, {
      plugins: [plugin]
    });
    expect(code).toBe("_joiner => _joiner(a, () => _joiner(b, () => c));");
  });
  test("bind var", () => {
    const result = transform(`${identifier}(x = a, y = b, c)`, {
      plugins: [plugin]
    });
    expect(result.code).toBe("_joiner => _joiner(a, x => _joiner(b, y => c));");
  });
  test("execute Promise", done => {
    const then = (promise, callback) => Promise.resolve(promise).then(callback);
    const { code } = transform(
      `${identifier}(
      x = Promise.resolve(4),
      y = x * 2,
      Promise.resolve(y - 2)
    )`,
      { plugins: [plugin] }
    );
    eval(code)(then)
      .then(result => expect(result).toBe(6))
      .then(done);
  });
  test("execute Maybe", () => {
    class Nothing {
      mbind(f) {
        return new Nothing();
      }
    }
    class Just {
      constructor(x) {
        this.x = x;
      }
      mbind(f) {
        return f(this.x);
      }
    }
    const bind = (monad, binder) => monad.mbind(binder);
    const { code } = transform(
      `
      n => ${identifier}(
        a = n,
        b = new Just(3),
        new Just(a + b)
      )
    `,
      { plugins: [plugin] }
    );
    expect(eval(code)(new Nothing())(bind)).toBeInstanceOf(Nothing);
    expect(eval(code)(new Just(4))(bind)).toEqual(new Just(7));
  });
});
