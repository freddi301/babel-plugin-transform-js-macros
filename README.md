# JS-MACROS [![CircleCI](https://circleci.com/gh/freddi301/babel-plugin-transform-js-macros/tree/master.svg?style=svg)](https://circleci.com/gh/freddi301/babel-plugin-transform-js-macros/tree/master)

A handful of useful macros as babel-plugin.

## Install

```bash
npm install --save-dev babel-plugin-transform-js-macros
```

`.babelrc`

```json
{
  "plugins": ["babel-plugin-transform-js-macros"]
}
```

## SymbolicExpression

```javascript
const myExpression = symbolic(x + y);
```

gives

```javascript
const myExpression = ({ x, y }) => x + y;
```
