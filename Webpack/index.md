# Webpack

Webpack is a bundler that combines modules into one or more bundled assets to be used in the browser. Webpack solves the problem of having dozens of separate, co-dependent script tags in the HTML. Thanks to loaders, the modules that we can bundle can be CommonJS, AMD, ES6, CSS, Images, JSON, Coffeescript, LESS, Fonts and much more.

Another benefit of Webpack is that it encapsulates our code for us so that we do not have to wrap everything in an IIFE to preserve scope.

### Input & Output to Webpack

[modules with dependences] -> WEBPACK -> [static assets in bundle.js]

or, more simply:

[entry] -> WEBPACK -> [output]

## Commonly Used Webpack Modes

* `-w or --watch`: watch file for changes (live reloading)
* '-p': optimize and compress for production

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

### Customizing Webpack Config for Different Environments

Set environmental variables in startup scripts in `package.json`:
```javascript
"scripts": {
  "build": "webpack -p --env.production",
  "dev": "webpack-dev-server --env.dev"
}
```

Then pass the environment variable into the Webpack configuration function:

```javascript
module.exports = (env) => {
  return {
    blah: blah,
    devtool: env.production ? 'source-map' : 'eval'
  }
}
```

### Loaders

Loaders process files individually based on their contents; they can also be chained for multiple translations. For example:

  * **Babel** compiles ES6 to JavaScript
  * **CSS or SASS Loaders** compile into CSS
  * **Image Loaders** compile images into either Base64 or (if that is too large a file) spits back a URL

Configure loaders and which files to include/exclude in module config:

```javascript
module: {
  loaders: {
    {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
    {test: /\.css$/, loaders: ['style', 'css']}
  }
}
```

Here we are running all files ending in .js through Babel, excluding 3rd party libraries, which should have already gone through this process. We load all .css files through first the CSS Loader, then through the Style Loader (note the right-to-left order).

For CSS, we need both a CSS Loader to handle external dependencies like fonts and images and a Style Loader, which injects the compiled CSS into the DOM at runtime. To pre-compile SASS, add a SASS Loader before the CSS Loader.

Injecting a `<style>` tag into the DOM becomes negatively performant as our app grows. It is recommended to adhere to the "Critical CSS" strategy - i.e. loading only the minimum styles needed in the head of our HTML. The rest will be loaded in the footer with our bundle.js file.

Alternatives:
  * The `extract-text-webpack` plugin extracts CSS from our bundled JavaScript so that it can be cached.
  * **Aphrodite** is a library that creates CSS styles from JavaScript code.

### Plugins

Give us all the functionality not available in loaders, for example code compression.

#### Source Maps

Set `devtool: 'eval'` (development) or `devtool: 'source-map'` (production) in `webpack.config.js` for easier line reading and debugging in the browser. This will add a new folder in your Developer Tools -> Sources called webpack://.

Note that it is bad practice to ship source maps in production. This is why we use `devtool: 'souce-map'` to move our source-mapped bundle file into a separate `bundle.js.map` file.

### Hot Module Reloading

HMR is available when with the `webpack-dev-server` module. It provides auto-refreshing capabilities, similar to how React updates the view every time there is a change in state.

### Tree Shaking

Tree shaking is the process by which we exclude exports from modules where the exports are not actually used. **Uglify**, the de-facto minifier for JS that is included in Webpack with the `-p` flag, will then delete the dead code.

Note: tree shaking only works with ES6 module syntax, NOT `require`.

### Code Splitting

Load specific chunks of code, when they are needed, in the most performant order possible. To do this, we can lazy load code using `System.import('./filename')`, which returns a promise.

The following is an example lazy loader function that contains an import for an expensive script called `render`:

```javascript
function lazyLoadFunc(arg1, arg2) {
  System.import('./render').then(data => {
      const loadModule = data.default;
      loadModule(arg1, arg2);
  });
};
```

This lazy load function can be called as needed to load the expensive module; it will only load the module once. Often this technique is used in apps running a heavy library such as `D3.js`.

### Commons Chunking

Commons chunking is useful when only a part of a codebase is updated regularly. Non-updated modules can be cached so users don't have to reload the entire codebase when updates are made. 3rd-party vendor files are good candidates for being placed in the commons chunk.

### Webpack Offline

The Webpack Offline plugin uses Service Workers to cache assets so that they are accessible even without a network connection. Service Workers require HTTPS.
