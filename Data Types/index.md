# Data Types

## Primitives
* Number
* String
* Boolean
* Null
* Object

### NaN

A special case of a primitive Number is **NaN** ("Not A Number"), which is produced whenever an arithmetic operation results in an undefined or unrepresentable value. **NaN** is falsey, i.e. `Boolean(NaN) = false`. Oddly enough, `typeof NaN = 'number'`, even though its name says Not A Number. **NaN** is the only value that is not equal to itself, either by double equals or triple equals.

```javascript
NaN == NaN // false
NaN === NaN // false
```

The global `isNaN` function is practically useless in determining if something is **NaN** because of countless false positives (for example, `isNan("JavaScript") = true`, because the string cannot be converted into a number, thus resulting in **NaN**). Instead we use the `Number.isNaN` method, which only returns true if given the actual **NaN** value. In older browsers we can use the following polyfill:

```javascript
Number.isNaN = Number.isNaN || function(x) { return x !== x; }
```

## Non-Primitives
* Function
* Array
* Objects

Note that `===` on non-primitives compares memory addresses.

## Checking Data Types

### Arrays

```javascript
Array.isArray(foo)
```

### Objects

```javascript
typeof foo === 'object' && foo !== null
```
