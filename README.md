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
const myExpression = symbolic(x + y);
```

gives

```javascript
const myExpression = ({ x, y }) => x + y;
```

## DoNotation

Mimics haskell do-notation. Takes an additional function to flatten the structure.

```javascript
const doNotation = join((x = a), (y = b), c);
```

gives

```javascript
const doNotation = _joiner => _joiner(a, x => _joiner(b, y => c));
```

**examples**:

```javascript
// Promise chain
const then = (promise, callback) => Promise.resolve(promise).then(callback);
const six = join(
  (x = Promise.resolve(4)), // binding a Promise
  (y = x * 2), // Promise.resolve will take care non-promise values
  Promise.resolve(y - 2)
)(then);
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
  join(
    (a = n), // n must be a monad
    (b = new Just(3)),
    new Just(a + b)
  )(bind);

plus3(new Nothing()) instanceof Nothing; // true
plus3(new Just(4)) instanceof Just; // true
plus3(new Just(5)).x === 8; // true
```

```javascript
const toArray = (item, next) => [item].concat(next(item));
join((a = 1), (b = 2), (c = a + b))(toArray); // [1,2,3]
```

```javascript
const assign = (item, next) => next(item);
join((a = 1), (b = 2), { a, b }); // { a: 1,b:2}
```

## TODO

* [ ] fix name collision
* [ ] allow nested macros
