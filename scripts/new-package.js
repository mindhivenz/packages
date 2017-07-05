var init = require('init-package-json');
var path = require('path');
var fs = require('fs');
var ncp = require('ncp');

var newPackageName = `${process.argv[2]}`;

let baseDirectory = path.resolve(__dirname, '../');
const packagesDirectory = path.resolve(baseDirectory, 'packages');
const initDirectory = path.resolve(baseDirectory, 'init');
const initFile = path.resolve(initDirectory, 'npm-init.js');
var defaultPackageDir = path.resolve(initDirectory, 'default-package');
var newPackageDir = path.resolve(packagesDirectory, newPackageName);

try {
  fs.mkdirSync(newPackageDir);
  ncp(defaultPackageDir, newPackageDir)
  init(newPackageDir, initFile, {}, function (er, data) {
  });
}
catch (err) {
  console.log(err);
  return
}