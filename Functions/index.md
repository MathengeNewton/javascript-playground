# Function

The arguments passed into a function can be accessed using the `arguments` array-like object (it has a `length` method but no other array methods). Functions can be called with any number of arguments, regardless of the number of parameters listed in the function declaration.

## Function Expression

```javascript
var foo = function(){}

var foo = function bar() {} // bar() will only exist within function scope
```

## Function Declaration

```javascript
`function foo(){}`
```
