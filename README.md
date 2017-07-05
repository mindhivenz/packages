#Monorepo for our NPM packages

##Commands
* `yarn` in root dir will install all dependencies and build packages
* `yarn build` builds `./packages/*/src` -> `./packages/*/build`
* `yarn build-clean` removes all `./packages/*/build`
* `yarn clean-all` removes all `./node_modules` && `./packages/*/node_modules` and runs `build-clean`
* **Not tested ....** `yarn publish` publishes all changed packages to NPM
