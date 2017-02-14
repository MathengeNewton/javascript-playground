# Module Pattern

Closures are used within the module pattern to create an interface for interacting with the data. We can prevent users from modifying data using private methods and properties.

```javascript
var module = function() {
  var privateProperty = 'foo';

  function privateMethod(args) {
    // do something
  }

  return {
    publicProperty: "",
    publicMethod: function(args) {
      // do something
    },
    privilegedMethod: function(args) {
      privateMethod(args);
    }
  }
}
```

Here we are returning an object with a privileged method that prevents direct user access of the private method, declared within the main parent function body. In this way, our API is abstracting away how mission-critical elements of the program are working.
