# Scope

The smallest atomic unit of scope is the function (pre-ES6).

Note: there is an implicit variable declaration that occurs when we pass an argument into a function.

```javascript
function baz(foo) {
  // implicit var foo; declaration here
  foo = "bam";
}
```

Two often confused terms are **undeclared** and **undefined**. **Undeclared** means that for a specific identifier, there is no declaration within any of the scopes that we have access to. If the variable was declared but not initialized to anything we call it **undefined**. This does not mean that the variable is empty; **undefined** is the value that fills the otherwise empty vacuum.
