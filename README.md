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

in root dir 

* **`yarn bootstrap`** will:

    1. Clean any compiled code and npm packages
    1. Install all project and sub package npm dependencies
    1. Compile build scripts from ES6 source
    1. Compile all packages

* **`yarn new package-name`**:
    1. Creates `src/packages/package-name`
    1. Copies `./init/default-package` -> `./packages/package-name`
    1. Runs `npm init` in `./packages/package-name` pulling default values from `./init/npm-init.js`

* **`yarn build`** builds `src/packages/*` -> `./packages/*`
    1. runs the `build.js` script 
    1. Iterates over `packages` building each in turn
    1. No need to update **EVERY** package if we change our build :)
    1. `mhpconfig,json` sets packages to `ignore`

* **`yarn test`** runs the `test` script in each package
    1. By default, **all** test scripts point to `./scripts/test.sh`
    1. No need to update **EVERY** package if we change our build :)
    
* **`yarn clean:build`** removes all `./packages/*`

* **`yarn clean:all`** removes all `./node_modules` && `./src/packages/*/node_modules` and runs `clean:build`


### mhpconfig.json
```json
{
  "mindhive-packages": "0.0.1",
  "ignore": [
    "documents",
    "richtext",
    "styles"
  ],
  "sourcePath": "./src/packages",
  "outPath": "./packages",

  "registry": "https://registry.npmjs.org/",
}
```
### Structure
```text
root
  |-init            ....    template/defaults for new package    
  |-packages        ....    our **compiled** npm packages
  |-src
  |-- scripts       ....    scripts ES6 source
  |-- packages      ....    packages ES6 source

```
