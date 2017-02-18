# npm

## Passing arguments to npm scripts

Say for example we have an npm script alias `npm run build:dev` that runs Webpack. To avoid re-typing this command every time, we can pass an additional argument to the string using `--`: `npm run build:dev -- argToPass`. To keep Webpack running, we could then do `npm build:dev -- -w` (w for watch).
