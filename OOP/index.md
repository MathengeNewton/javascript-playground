# OOOP

## Object Inheritance

Inheritance is implemented using a prototype chain with `Object.setPrototypeOf(child, parent)`. If a child scope does not contain an invoked method, the engine will then look up to the scope of the parent.

```javascript
function talk() {
  console.log(this.sound);
}

let animal = {
  talk
};

let cat = {
  sound: "FEEDME"
};
cat.talk(); // cat.talk is not a function
Object.setPrototypeOf(cat, animal);
cat.talk(); // "FEEDME"

```

## The new Keyword

Let's rebuild our own version of the `new` keyword to understand what is going on under the hood:

```javascript
function newRebuilt(constructor) {
  var obj = {}; // 1. Creates an empty object
  Object.setPrototypeOf(obj, constructor.prototype); // 2. Sets prototype of the new object
  var argsArray = Array.from(arguments); // Creates array of arguments - ES6 syntax
  var result = constructor.apply(obj, argsArray.slice(1)) // 3. Executes constructor with object and any arguments passed in (arguments[1], arguments[2], etc.)
  return result || obj; // 4. Returns the object the constructor returns (edge case) otherwise return the new object
}


```
