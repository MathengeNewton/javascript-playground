# Testing

Testing involves different levels of abstraction which can be classified into:

1. Test Runners
1. Testing Frameworks
1. Assertion libraries
1. Testing Plugins

## Karma

Karma is a test runner that creates a fake server and launches tests in various browsers. Within `karma.config.js` we configure which testing software will plug into Karma (Mocha, Chai, etc.).

## Mocha

Mocha is a testing framework that gives us access to `describe`, `beforeEach`, `context` and `it` testing methods.

## Chai

Chai is an assertion library that plugs into Mocha. It gives us methods such as `expect`, `equal` and `exist`, which determine whether any given condition is valid.

Note: Methods derived from the testing framework (i.e. Mocha) occur outside the `it` block. Methods derived from the assertion library (i.e. Chai) occur inside the `it` block. The `it` block can be viewed as the interface between two levels of abstraction in our testing.

## Sinon

Sinon is an example of a testing plugin that hooks into Chai and provides additional test functionality.

## Jasmine

Jasmine is a testing framework like Mocha that, unlike Mocha, comes with its own assertion library built in. It's easier to set up, but less flexible.
