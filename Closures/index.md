# Closures

The key with closures is that we create an inner function that is returned by an outer function so that we can call it at a later time. All of the variables in the outer scope are preserved and accessible from the time of invocation from within this inner function.

We can also return an object and retain access to the object's methods after the fact.

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

  return innerVar;
}

var testScope = checkScope();
testScope(); // "local scope"
```
