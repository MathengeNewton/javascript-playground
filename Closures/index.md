# Closures

Closure is when a function "remembers" its lexical scope even when the function is executed outside that lexical scope. Nested functions encapsulate the scope of the parent so that variables continue to exist even after the outer function executes.

Closure is a necessary mechanism in a number of common methods and tasks, including `setTimeout` and adding event handlers. Both of these examples require that functions be executed at a later time yet still retain their lexical scope.

## How to Create a Closure

1. Create a parent function
1. Define variables in the parent's local scope
1. Define a child function inside the parent
1. Return the child function from inside the parent

```javascript
function checkScope() {
  var innerVar = "local scope";

  function innerFunc() {
    return innerVar;
  }

  return innerFunc;
}

var testScope = checkScope();
testScope(); // "local scope"
```

## Common Scoping Exercises

The following illustrates a gotcha with closure:

```javascript
for (var i = 1; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i*1000);
}
```

Instead of printing `1 2 3 4 5` as desired, this prints `5 5 5 5 5`. Why? Because at the time that the anonymous functions are invoked the for loop has already run through and `i = 5`.

To fix this we can either wrap the `setTimeout` in an IIFE, which encloses on the variable `i`:

```javascript
for (var i = 1; i < 5; i++) {
  (setTimeout(function() {
    console.log(i);
  }, i*1000))();
}
```
