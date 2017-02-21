# Function

The arguments passed into a function can be accessed using the `arguments` array-like object (it has a `length` method but no other array methods). Functions can be called with any number of arguments, regardless of the number of parameters listed in the function declaration.

A common task is converting the `arguments` object into a proper array, which can then be passed into other functions. In ES6, this is trivially accomplished with `Array.from`; in ES5, we would access the `Array.prototype.slice` method and `apply` it to the `arguments` object:

```javascript
function foo() {
  var argsArrayES6 = Array.from(arguments);
  var argsArrayES5 = Array.prototype.slice.apply(arguments); 
}
```

## Function Expression

A function that is assigned to variable is called a function expression.

```javascript
var foo = function(){} // anonymous function expression

var foo = function bar() {} // bar() will only exist within function scope
```

Note of caution: Anonymous function expressions a) do not give you a way to refer to the function from inside of itself (i.e. for unbinding an event handler or for recursion) and b) are completely useless when trying to debug using the stack track.

### IIFE

The Immediately Invoked Function Expression pattern is a technique used to encapsulate inner variables without polluting outer scope.

```javascript
var foo = "bar";

(function() { // this is now a function expression
  var foo = "baz";
  console.log(foo); // "baz"
})();

console.log(foo); // "bar"
```

Here we wrap an anonymous function in parentheses, changing it from a declaration to an expression. Then we call it with `()`. It is recommended that you name your IIFEs, for example:

```javascript
(function iife() {

})();
```

If you are following the IIFE pattern and need to make one or more of your functions public, simply attach them to the global window object. You can pass in the window object via invocation time with:

```javascript
(function iife(window) {
  window.globalFunc = function() {
    console.log("I'm available outside the IIFE");
  }

  hiddenFunc = function() {
    console.log("I'm only available inside the IIFE");
  }
})(window);
```

Contrast this with creating a named function declaration and then calling that function by name:

```javascript
function qux() {

}
qux();
```

In this case, the function name has leaked (unnecessarily) into global scope.

## Function Declaration

A function declaration occurs when the function keyword is the first word of a statement (not necessarily the line).

```javascript
`function foo(){}`
```
