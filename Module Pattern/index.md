# Module Pattern

Closures are used within the module pattern to create an interface for interacting with the data. We can prevent users from modifying data using private methods and properties.

```javascript
var module = (function() {
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
})();
```

Here we are returning an object with a privileged method that prevents direct user access of the private method, declared within the main parent function body. In this way, our API is abstracting away how mission-critical elements of the program are working.

## Characteristics of the Module pattern

1. There must be an outer wrapping function that gets executed.
1. There must be one or more inner functions that get returned.

### API Examples

It behooves us to return named objects, instead of anonymous ones, because then we keep a reference that will enable us to make modifications to the API at runtime.

```javascript
var foo = (function() {
  var publicAPI = {
    bar: function(){
      publicAPI.baz();
    },
    baz: function(){
      console.log("baz");
    }
  };

  return publicAPI;
})();

foo.bar(); // "baz"
```

## ES6 Modules

In ES6 we get first class support for modules, eliminating the need to create the outer function. Instead, it is file based, and we use the `export` keyword to add things to the public API.

```javascript
var o = { bar: "bar" };

export function bar() {
  return o.bar;
}
```

The `import` keyword allows you to import a specific member of the public API.

```javascript
import { bar } from 'foo';
import * as foo from 'foo';
```

If we use the `default export` keywords, we do not need to use ES6 destructuring on `import`:

```javascript
//------ foo.js ------
export default function () { ··· } // no semicolon!

//------ main.js ------
import foo from 'foo';
myFunc();
```
