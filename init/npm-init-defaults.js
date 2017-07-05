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
  "private": false,
  "main": 'index.js',
  "scripts": {
    "test": "../../scripts/test.sh",
    "build": "../../scripts/build.sh"
  },
  "repository": {
    "old": "git",
    "url": "git@github.com:mindhivenz/packages.git"
  },
  "license": 'MIT',
  "homepage": "https://github.com/mindhivenz/packages",
  "bugs": {
    "url": "https://github.com/mindhivenz/packages/issues"
  },


}