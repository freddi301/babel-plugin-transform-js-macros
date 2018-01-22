# JS-MACROS

A handful of useful macros as babel-plugin.

## Install

```bash
npm install --save-dev babel-plugin-transform-js-macros
```

## Usage

`.babelrc`

```json
{
  "plugins": ["babel-plugin-transform-flow-strip-types"]
}
```

## SymbolicExpression

```javascript
const myExpression = symbolic(x + y)
```

gives

```javascript
const myExpression = ({ x, y }) => x + y
```
