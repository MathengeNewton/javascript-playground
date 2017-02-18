# Webpack

Webpack is a bundler that combines modules into one or more bundled assets to be used in the browser. Webpack solves the problem of having dozens of separate, co-dependent script tags in the HTML. Thanks to loaders, the modules that we can bundle can be CommonJS, AMD, ES6, CSS, Images, JSON, Coffeescript, LESS, Fonts and much more.

Another benefit of Webpack is that it encapsulates our code for us so that we do not have to wrap everything in an IIFE to preserve scope.

### Input & Output to Webpack

[modules with dependences] -> WEBPACK -> [static assets]

or

[entry] -> WEBPACK -> [output]

### Loaders

Loaders process files individually based on their contents; they can also be chained for multiple translations. For example:

  * **Babel** compiles ES6 to JavaScript
  * **CSS or SASS Loaders** compile into CSS
  * **Image Loaders** compile images into either Base64 or (if that is too large a file) spits back a URL

### Plugins

Give us all the functionality not available in loaders, for example code compression.

## Configuring Webpack

The `webpack.config.js` file is the default location for configuration settings; name the file `webpack.config.babel.js` to have it run through Babel.

Using CommonJS, we configure our required output object:

```javascript
const {resolve} = require('path');

module.exports = () => {
  return {
    context: resolve('src'),
    entry: './bootstrap.js',
    output: {
      filename: 'bundle.js',
    },
  }
}
```

## Commonly Used Webpack Modes

* `-w or --watch`: watch file for changes (live reloading)
