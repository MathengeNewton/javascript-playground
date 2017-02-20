# Scope

The smallest atomic unit of scope is the function (pre-ES6). Little known fact: since ES3, the `catch` clause has been another instance of block scope. This has been reversed in ES6 but will once again be block scoped come ES7.

Note: there is an implicit variable declaration that occurs when we pass an argument into a function.

```javascript
function baz(foo) {
  // implicit var foo declaration here
  foo = "bam";
}
```

Two often confused terms are **undeclared** and **undefined**. **Undeclared** means that for a specific identifier, there is no declaration within any of the scopes that we have access to. If the variable was declared but not initialized to anything we call it **undefined**. This does not mean that the variable is empty; **undefined** is the value that fills the otherwise empty vacuum.

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

Unlike `var`, the `let` keyword does not hoist.

**References**

  *[You Don't Know JS: Scope & Closures: Chapter 2: Lexical Scope](/https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch2.md)
