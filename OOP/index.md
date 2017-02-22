# OOOP

## Object Inheritance

Inheritance is implemented in JavaScript using a prototype chain; if a child scope does not contain an invoked method or property, the engine will look up to the scope of the parent, and so on. We can use `Object.create(prototype)` to create new a object and assigns it a prototype. This method was written by Douglas Crockford as a way of creating objects that is more in line with how prototypes work that the `new` keyword.

```javascript
function cat() {
  makeSound: function() {
    console.log(this.sound);
  }
}

var fred = Object.create(cat);
fred.sound = "Moo";
fred.makeSound();

cat.isPrototypeOf(fred); // true
```

The `Object.create` method uses `Object.setPrototypeOf(child, parent)` behind the scenes; never use this method directly as it is a performance hog.

## The new Keyword

There are 4 key details with how the `new` keyword works. Let's rebuild our own version to understand what is going on under the hood:

```javascript
function newRebuilt(_constructor) {
  var obj = {}; // 1. Creates an empty object
  Object.setPrototypeOf(obj, _constructor.prototype); // 2. Sets prototype of the new object
  var argsArray = Array.from(arguments); // Creates array of arguments - ES6 syntax
  var result = _constructor.apply(obj, argsArray.slice(1)); // 3. Executes constructor with object and any arguments passed in (arguments[1], arguments[2], etc.)
  return result || obj; // 4. Returns the object the constructor returns (edge case) otherwise return the new object
}
```

## proto vs. prototype

`__proto__` references the prototype of an object. Modifying the parent prototype will result in changes to children down the chain. This is in contrast to proper class based languages, which instantiate entirely new objects that are separate from their parents.

`prototype` exists only on functions for the sole purpose of using the function as a constructor passed to the `new` keyword. All functions are automatically given a `prototype` property on declaration (unlike object literals, for example):

```javascript
function robot() {};
var dolphin = {};

robot.prototype; // Object {}
dolphin.prototype; // Undefined

robot.__proto__; // function () {}
dolphin.__proto__; // Object {}
```
