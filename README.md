# Mindhive Packages
[Monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) 
for our NPM packages using [Lerna](https://github.com/lerna/lerna) and with inspiration 
from [Bable](https://github.com/babel/babel/tree/master/packages) and 
[Jest](https://github.com/facebook/jest/tree/master/packages)

```text
    THIS IS A LITTLE OUT OF DATE :)
```

### NPM
1. `npm whois` shows login
1. `npm login` to login as motorweb user:
```
username: motorweb
password: *******
email: damon@motorweb.co.nz
```

### Getting started
1. First thing run `yarn bootstrap` to install npm dependencies, compile build scripts and build any packages
1. `npm install -g flow-typed`
1. `npm install --save-dev flow-bin`
1. `yarn add babel-preset-flow`
1. `npm install -g prettier`

#### Basics
1.  `yarn new <package>` creates a new package
1.  `yarn build` builds all packages not `ignored`
1.  `yarn clean:build` deletes all compiled packages
1.  `yarn clean:all` runs `clean:build` then deletes all `node_modules` for all packages and the project
1.  `yarn pub` not implemented yet....
 
#### Commands

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

  "registry": "https://registry.npmjs.org/"
}
```
### Structure
```text
root
  |-compiled_scripts    ....        
  |-lib
  |  |-- packages       ....    our COMPILED npm packages
  |  |-- scripts        ....    DON'T EDIT, see src/scripts
  |-src
  |-- scripts           ....    scripts ES6 source
  |-- packages          ....    packages ES6 source

```
### Prettier
[Prettier](https://github.com/prettier/prettier)  is an opinionated code formatter that's getting traction as a replacement for linting as it just formats the code in one way with very few config options. Giving it a go here to see how we feel about it. It's pretty close to ```AirBnB``` and so far I like it. 

Upshot is that our entire code base will be auto formatted to one very strict style with no effort or thought from us. Can be setup to style on save or pre-commit or whatever but for now I've only set up commands to do it when you want....



#####Setup in Idea:
Open ```Intelij Idea -> Preferences... -> Tools -> External```
1. ```+``` create new called ```Prettier file```
    1. Program set ```./node_modules/.bin/prettier```
    1. Parameters set ```--single-quote --no-semi --trailing-comma es5 --jsx-bracket-same-line --write $FilePathRelativeToProjectRoot$```
    1. Working directory set `$ProjectFileDir$`
    1. Save that
    
1. Clone the above and call it ```Prettier dir```
    1. Parameters set *--single-quote --no-semi --trailing-comma es5 --jsx-bracket-same-line --write* ```$FileDirRelativeToProjectRoot$"/+(*.js|*.jsx)"```

1. Clone the above and call it ```Prettier scripts```
    1. Parameters set *--single-quote --no-semi --trailing-comma es5 --jsx-bracket-same-line --write ```"{app,src/scripts}/**/*.js"```
    1. Note the ```"``` surrounding *{app,src/scripts}/**/*.js* 

#####Usage
```Cmd-Shift-A```  then type ```prettier``` and:
 1. ```Prettier file```: format the file you are editing
 1. ```Prettier dir```: format all files in the package of the current file
 1. ```Prettier scripts```: format all script source files