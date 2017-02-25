# OOP

## Object Inheritance

Inheritance is implemented in JavaScript using a prototype chain; if a "child" scope does not contain an invoked method or property, the engine will look up to the scope of linked "parent" object, and so on. It may be more accurate to say that JavaScript has "behavior delegation" instead of "inheritance".

We can use `Object.create(prototype)` to create new a object and assigns it a prototype. This method was written by Douglas Crockford as a way of creating objects that is more in line with how prototypes work that the `new` keyword.

```javascript
function Cat() {
  makeSound: function() {
    console.log(this.sound);
  }
}

var fred = Object.create(Cat);
fred.sound = "Moo";
fred.makeSound();

cat.isPrototypeOf(fred); // true
```

Methods and properties are added to the `prototype` object:

```javascript
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function() {
  return "I am " + this.me;
};

function Bar(who) {
  Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function() {
  alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
b1.speak();
```

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

## `[[Prototype]]` vs. `__proto__` vs. `prototype`

In JavaScript, two objects can be linked to each other via an internal `[[Prototype]]` chain. This chain is the basis for property and method lookups; if something is not found in scope, the `get` lookup will traverse the chain and try to resolve the property/method on the linked object. If still not found, it will keep going up the prototype chain until it satisfies the lookup or has no more objects to traverse.

`[[Prototype]]` ("Bracket Bracket P") is the internal linkage between objects. Created either through `Object.create` or through the use of the `new` keyword.

`__proto__` ("dunder-proto") is a public property that references the internal `[[Prototype]]` of an object. Prototype linkages allows us to delegate method calls or property references to other objects without duplication of code. Methods and properties of one object can shadow other objects - i.e. share the same name. Note: `Object.getPrototypeOf(obj) === obj.__proto__`.

`prototype` is an internal object that exists only on functions for the sole purpose of using the function as a constructor passed to the `new` keyword. It is the object from which other objects inherit their properties. All functions are automatically given a `prototype` property on declaration (unlike object literals, for example):

```javascript
function robot() {};
var dolphin = {};

robot.prototype; // Object {}
dolphin.prototype; // Undefined

robot.__proto__; // function () {}
dolphin.__proto__; // Object {}
```

## OLOO: Objects Linked to Other Objects

A different pattern of thinking that emphasizes the linkages between objects and delegation of methods without using a formal constructor function:

```javascript
var Foo = {
  init: function(who) {
    this.me = who;
  },
  identify: function() {
    return "I am " + this.me;
  }
};

var Bar = Object.create(Foo);

Bar.speak = function() {
  alert("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();
```

This is a style promoted by Kyle Simpson. Notice that it does not involve the `new` keyword or any manual additions to the `prototype` object. Instead, `Object.create` handles all that for us. Here's a polyfill for `Object.create` showing what it does behind the scenes.

```javascript
  if (!Object.create) {
    Object.create = function(o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }
```
