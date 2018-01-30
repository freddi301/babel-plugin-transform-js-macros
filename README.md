# JS-MACROS [![CircleCI](https://circleci.com/gh/freddi301/babel-plugin-transform-js-macros/tree/master.svg?style=svg)](https://circleci.com/gh/freddi301/babel-plugin-transform-js-macros/tree/master) [![codecov](https://codecov.io/gh/freddi301/babel-plugin-transform-js-macros/branch/master/graph/badge.svg)](https://codecov.io/gh/freddi301/babel-plugin-transform-js-macros)

A handful of useful macros as babel-plugin.

## Install

```bash
npm install --save-dev babel-plugin-transform-js-macros
```

`.babelrc` <- `{ "plugins": ["babel-plugin-transform-js-macros"] }`

## SymbolicExpression

Detect free variables in an expression and return a lambda that takes those as arguments.

```javascript
symbolic, x + y;
```

gives

```javascript
({ x, y }) => x + y;
```

## DoNotation

Mimics haskell do-notation. Takes an additional function to flatten the structure.

```javascript
join, (x = 1), (y = 2), 3;
```

gives

```javascript
_joiner => _joiner(1, x => _joiner(2, y => 3));
```

**examples**:

```javascript
// Promise chain
const then = (promise, callback) => Promise.resolve(promise).then(callback);
const six = (join,
(x = Promise.resolve(4)), // binding a Promise
(y = x * 2), // Promise.resolve will take care non-promise values
Promise.resolve(y - 2))(then);
six.then(console.log); // 6
```

```javascript
// Maybe
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

// here the magic
const plus3 = n =>
  (join,
  (a = n), // n must be a monad
  (b = new Just(3)),
  new Just(a + b))(bind);

expect(plus3(new Nothing())).toEqual(new Nothing());
expect(plus3(new Just(5))).toEqual(new Just(8));
```

```javascript
const toArray = (item, next) => [item].concat(next(item));
expect((join, (a = 1), (b = 2), a + b)(toArray)).toEqual([1, 2, 3]);
```

```javascript
const assign = (item, next) => next(item);
expect((join, (a = 1), (b = 2), { a, b })(assign)).toEqual({ a: 1, b: 2 });
```

## TODO

* [ ] fix name collision
* [ ] allow nested macros
