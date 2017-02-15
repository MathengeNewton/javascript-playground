# Higher Order Functions

Higher Order Functions either take a function as an argument (a **callback**) or return a function as an output.

Here we replace the traditional if/else with a function that takes two callback functions, one for each case:

```javascript
  var ifElse = function(condition, trueFunc, falseFunc) {
    if (condition) {
      trueFunc();
    } else { falseFunc(); }
  }

  var trueFunc = function( { console.log(true); } );
  var falseFunc = function( { console.log(false); } );

  ifElse(true,trueFunc,falseFunc); // console.log(true)
```
