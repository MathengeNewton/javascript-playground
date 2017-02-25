# Scope

The smallest atomic unit of scope is the function (pre-ES6). Little known fact: since ES3, the `catch` clause has been another instance of block scope. This has been reversed in ES6 but will once again be block scoped come ES7.

Note: there is an implicit variable declaration that occurs when we pass an argument into a function.

```javascript
function baz(foo) {
  // implicit var foo declaration here
  foo = "bam";
}
```

**Hoisting** is a useful mental model to understand how declarations are parsed by the JavaScript engine. It refers to how both variable declarations and functions are moved to the top of their scope block during the compiling phase.

A key feature of **hoisting** is that function declarations are hoisted in their entirety, while function expressions are not.

```javascript
var a = b(); // "Declaration is hoisted"
var c = d(); // Undefined

function b() {
  console.log("Entire declaration is hoisted");
}

var d = function() {
  console.log("Only the function expression variable is hoisted");
};

```

At the point when we try to call `d()`, it does not yet have a value and thus cannot be executed.

Function declarations of the same name will overwrite one another when hoisted to the top of scope. The one declared later in the code will prevail. Also note that function declarations are hoisted above variable declarations.

```javascript
foo(); // "foo"

var foo = "qux";

function foo() {
  console.log("bar");
}

function foo() {
  console.log("foo");
}
```

Two often confused terms are **undeclared** and **undefined**. **Undeclared** means that for a specific identifier, there is no declaration within any of the scopes that we have access to. If the variable was declared but not initialized to anything we say it is **undefined**. This does not mean that the variable is empty; **undefined** is the value that fills the otherwise empty vacuum of an uninitialized variable.

## Lexical Scope

Lexical scope or static scope refers to scope that can be determined at "lexing time", i.e. the first traditional phase of a standard language compilation. It is based on where variables and blocks of scope are authored and is therefore (mostly) fixed at runtime.

The way that the compiler traverses lexical scope is akin to going up the floors of a building. Each floor is searched for a given variable before the compiler moves "up" a level, into the next outermost function. We can write closures to encapsulate and preserve variables for later use, by taking advantage of the fact that inner functions contain the scope of parent functions even after the parent function has returned.

### eval() - Cheating Lexical Scope

The function `eval` modifies the existing lexical scope to add a new declaration at runtime. When `eval` is present, even if it is not modifying scope, the compiler cannot make its normal optimizations, resulting in slower performance. Avoid at all costs.

```javascript
var bar = "bar";

function foo(str) {
  eval(str); // cheats the lexical scope by evaluating passed in argument
  console.log(bar); // 42
}

foo("var bar = 42;");

```

## Block Scope With Let

New in ES6 is the `let` keyword, which will attach the variable to the block it appears in rather than attaching it to the enclosing function. This is especially handy in loops and if statements:

```javascript
(function foo() {
  var bar = "bar";
  for (let i = 0; i < bar.length; i++) {
    console.log(bar.charAt(i));
  }
  console.log(i); // ReferenceError
})();
```

```javascript
function foo() {
  var foo = "bar";
  if (foo) {
    let baz = "qux";
  }
  console.log(baz); // ReferenceError
}
```

Unlike `var`, the `let` keyword does not hoist so you must be sure to declare it at the top of the scope in which you're using it.

## this Keyword

Every function, while executing, has a reference to its current execution context, called `this`. How `this` is defined is determined by where the function is called. The following four rules apply, in **increasing order of precedence**:

1. If we had just a normal function call `foo()` or an IIFE, the default binding rule applies: if in strict mode, default the `this` keyword to the `undefined` value; else, default the `this` keyword to the global object.
1. When there is an object property reference at the call-site, `obj.foo()`, the implicit binding rule applies: the object at the call-site (aka the base/owning object) becomes the `this` binding.
1. If we use `call` or `apply` at the call-site, the explicit binding rule applies: the argument of the function call is explicitly set to be the `this` binding. See below for an example of hard binding, which is the basis for the `bind` method.
1. If we use the `new` keyword, hijacking a function call and turning it into a constructor call: the `this` binding is set to the newly created empty object.

```javascript
function foo() {
  console.log(this.bar);
}

var bar = "rule1";
var obj = { bar: "rule2", foo: foo };
var obj = { bar: "rule" };

foo(); // "rule1"
obj.foo(); // "rule2"
foo.call(obj); // "rule3"
```

## Hard Binding with bind()

One way to eliminate the uncertainty of the `this` binding is to hard bind it to the correct object. Then, no matter how the function is called at a later time, it will continue to reference the same `this`:

```javascript
function foo() {
  console.log(this.bar);
}

var bar = "global";
var obj = { bar: "obj-bar" };
var obj2 = { bar: "obj2-bar" };

var orig = foo; // preserve the original function
foo = function() { orig.call(obj) }; // overwrite foo, hard binding the this keyword permanently to obj

foo(); // "obj-bar" NOT "global"
foo.call(obj2); // "obj-bar" NOT "obj2-bar"
```

This forms the basis of the `Function.prototype.bind` method, which simplifies the syntax:

```javascript
this.x = 9;
var module = {
  x: 30,
  getX: function() { return this.x; }
};

module.getX(); // 30 (Rule 2)

var defaultsToGlobal = module.getX;
defaultsToGlobal(); // 9 (Rule 1)

var retrieveModuleX = defaultsToGlobal.bind(module);
retrieveModuleX(); // 30 (Rule 3)
```

## new keyword

The`new` keyword turns a function call into a constructor call, with four ramifications:

1. A new empty object is created.
1. The new object is linked to another object, by `[[Prototype]]` linkage.
1. The new object gets bound as the `this` keyword for that function call.
1. If that function does not otherwise return anything, it will implicitly insert a `return this`, returning the new object.

**References**

  *[You Don't Know JS: Scope & Closures: Chapter 2: Lexical Scope](/https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch2.md)
