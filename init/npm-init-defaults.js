var fullname = require('fullname');


module.exports = {
  "name": prompt("Name", `@mindhive/${process.newPackageName}`),
  "version": prompt("Version", '0.0.1'),
  "description": prompt("Description", ''),
  "keywords": prompt("Keywords", ''),
  "author": callBack => {
    fullname().then(name => {
      callBack(null, prompt('Author', name))    }
    );
  },
  "main": 'build/index.js',
  "git": 'git@github.com:mindhivenz/packages.git',
  "license": 'MIT',
  "homepage": "https://github.com/mindhivenz/packages",
  "bugs": {
    "url": "https://github.com/mindhivenz/packages/issues"
  },


}