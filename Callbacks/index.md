# Callbacks

Callbacks are a pattern to enable our code to execute asychronously, often when interacting with a 3rd party API. In doing so we invert control of our program execution to some external functionality that we trust will invoke our callback at the correct time and with the expected response data.

```javascript
setTimeout(function() {
  console.log("callback");
}, 1000);
```

*Callback hell* aka *The Pyramid of Doom* is when callbacks are nested many levels deep.
