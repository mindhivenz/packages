var init = require('init-package-json');
var path = require('path');
var fs = require('fs');
var ncp = require('ncp');

const newPackageName = `${process.argv[2]}`;
process.newPackageName = newPackageName

const baseDirectory = path.resolve(__dirname, '../');
const packagesDirectory = path.resolve(baseDirectory, 'packages');
const initDirectory = path.resolve(baseDirectory, 'init');
const initFile = path.resolve(initDirectory, 'npm-init-defaults.js');
const defaultPackageDir = path.resolve(initDirectory, 'default-package');
const newPackageDir = path.resolve(packagesDirectory, newPackageName);

if (fs.existsSync(newPackageDir)) {
  console.warn(`Package directory already exists: ${newPackageDir}`);
  return
}

try {
  ncp(defaultPackageDir, newPackageDir);
  init(newPackageDir, initFile, {"__pn": newPackageName}, () => {});
}
catch (err) {
  console.log(err);
  return
}