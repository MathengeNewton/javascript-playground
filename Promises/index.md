# Promises

Promises are a way to subscribe to the completion of a task; they represent a future value. This solves the inherent inversion of control issue with callbacks because we are able to decide how to handle asynchronous responses.

They give us a synchronous-looking syntax for an asychronous set of tasks. We can even chain promises using `then`.

```javascript
var p = new Promise(function(resolve, reject){
  setTimeout(function(){
    resolve("Success");
  }, 1000);
});

p.then(function(successMessage){
  console.log("Response: " + successMessage);
});
```

Many asynchronous libraries combine promises and generators: the generator yields out promises; when the promises complete they restart the generator.
