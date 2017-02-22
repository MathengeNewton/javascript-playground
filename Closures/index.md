# Closures

Closure is when a function "remembers" its lexical scope even when the function is executed outside that lexical scope. This is accomplished by encapsulating variables inside of an inner function that we can call it at a later time or pass into other function.. All of the variables in the outer scope are preserved and accessible from the time of invocation from within this inner function.

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
