# Monorepo for our NPM packages

##Commands
* **`yarn`** in root dir will install all dependencies and build packages

* **`yarn new package-name`**:
    1. Creates `./packages/package-name`
    2. Copies `./init/default-package` -> `./packages/package-name`
    3. Runs `npm init` in `./packages/package-name` pulling default values from `./init/npm-init.js`
    
* **`yarn build`** builds `./packages/*/src` -> `./packages/*/build`
    1. `lerna` runs the `build` script in each package
    2. By default, **all** build scripts point to `./scripts/build.sh`
    3. No need to update **EVERY** package if we change our build :)
    
* **`yarn test`** runs the `test` script in each package
    1. By default, **all** test scripts point to `./scripts/test.sh`
    2. No need to update **EVERY** package if we change our build :)
    
* **`yarn clean-build`** removes all `./packages/*/build`

* **`yarn clean-all`** removes all `./node_modules` && `./packages/*/node_modules` and runs `build-clean`

* **`yarn pub`** publishes all changed packages to NPM, asking for versioning along the way
