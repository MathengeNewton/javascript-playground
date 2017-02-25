# Generators

The normal JavaScript way of thinking is that as soon as a function starts executing it must continue executing through to completion. Generators are a new type of function that can pause execution and resume at a later time.

When you call a generator function (`var it = gen()` below), it doesn't actually execute anything. Instead it constructs an iterator which can be used to control the operation of the generator. Use `next` to start the generator and the iterator will execute until it reaches a `yield`, at which point it halts. A generator does not have to run through to completion.

Note the new `function*` syntax:

```javascript
function* gen() {
  console.log("Hello");
  yield null;
  console.log("World");
}

var it = gen();
it.next(); // "Hello"
it.next(); // "World"
```

`yield` is a two-way communication channel for us to receive input from and send input to the generator.

## Asynchronous Flow Control With Generators

Generators allow us to hide asynchronicity behind what looks like synchronous code. Here `getData` represents what could be a call to a 3rd party API.

```javascript
function getData(d) {
  setTimeout(function() { run(d); }, 1000);
}

var run = coroutine(function* () {
  var x = 1 + (yield getData(10));
  var y = 1 + (yield getData(30));
  var answer = (yield getData("Meaning of life: " + (x + y)));
  console.log(answer);
});

run();
```
