# Monorepo for our NPM packages

##Commands
* `yarn` in root dir will install all dependencies and build packages
* `yarn new <package-name>`:
    1. Creates `./packages/package-name`
    2. Copies `./init/default-package` -> `./packages/package-name`
    3. Runs `npm init` in `./packages/package-name` pulling default values from `./init/npm-init.js`
* `yarn build` builds `./packages/*/src` -> `./packages/*/build`
* `yarn build-clean` removes all `./packages/*/build`
* `yarn clean-all` removes all `./node_modules` && `./packages/*/node_modules` and runs `build-clean`
* `yarn pub` publishes all changed packages to NPM, asking for versioning along the way
