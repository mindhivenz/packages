# Mindhive Packages
[Monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) 
for our NPM packages using [Lerna](https://github.com/lerna/lerna) and with inspiration 
from [Bable](https://github.com/babel/babel/tree/master/packages) and 
[Jest](https://github.com/facebook/jest/tree/master/packages)

### Basics
1.  Create a new package: `yarn new my-package`
1.  To add/remove npm dependencies, `cd ./packages/my-package` then `yarn add ?` and `yarn delete ?` as per normal
1.  `package.json` in `root` is for packages required for this project, ie `bable` etc...
### Commands

* **`yarn`** in root dir will install all dependencies and build packages

* **`yarn new package-name`**:
    1. Creates `./packages/package-name`
    1. Copies `./init/default-package` -> `./packages/package-name`
    1. Runs `npm init` in `./packages/package-name` pulling default values from `./init/npm-init.js`
    
* **`yarn build`** builds `./packages/*/src` -> `./packages/*/build`
    1. `lerna` runs the `build` script in each package
    1. By default, **all** build scripts point to `./scripts/build.sh`
    1. No need to update **EVERY** package if we change our build :)
    
* **`yarn test`** runs the `test` script in each package
    1. By default, **all** test scripts point to `./scripts/test.sh`
    1. No need to update **EVERY** package if we change our build :)
    
* **`yarn clean-build`** removes all `./packages/*/build`

* **`yarn clean-all`** removes all `./node_modules` && `./packages/*/node_modules` and runs `build-clean`

* **`yarn pub`** publishes all changed packages to NPM, asking for versioning along the way. I've found that to get the 
    package published for the first time I need to `npm publish --access public` in the package directory as well as `npm add user`, `mindhive`, `password`, `email`...... Once it's there it works fine with `yarn pub` in the root.
     
     _Maybe we should sign up for an organisation?_

### Structure
```text
root
  |-init        ....    template/defaults for new package    
  |-packages    ....    individual npm packages live here
  |-scripts     ....    helper scripts

```
