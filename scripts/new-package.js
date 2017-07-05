var init = require('init-package-json');
var path = require('path');
var fs = require('fs');
var ncp = require('ncp');

// a path to a promzard module.  In the event that this file is
// not found, one will be provided for you.
var initFile = path.resolve(process.cwd(), 'scripts/init/npm-init.js');
console.log(initFile)
// the dir where we're doin stuff.
var dir = `${process.cwd()}\\packages\\${process.argv[2]}`;
var defaultPackageDir = `${process.cwd()}/scripts/init/default-package`
var newPackageDir = `${process.cwd()}/packages/${process.argv[2]}`
var packageName = `${process.argv[2]}`;

// extra stuff that gets put into the PromZard module's context.
// In npm, this is the resolved config object.  Exposed as 'config'
// Optional.
var configData = {
  version: '0.0.0',
  name: 'ccccccc',
  some: 'extra stuff'
};
try {
  process.chdir('./packages');
  console.log('New directory: ' + process.cwd());
  fs.mkdirSync(packageName);
  process.chdir(packageName);
  ncp(defaultPackageDir, newPackageDir)
}
catch (err) {
  console.log('chdir: ' + err);
}
// Any existing stuff from the package.json file is also exposed in the
// PromZard module as the `package` object.  There will also be free
// vars for:
// * `filename` path to the package.json file
// * `basename` the tip of the package dir
// * `dirname` the parent of the package dir

init(process.cwd(), initFile, configData, function (er, data) {
  console.log(initFile, configData, er, data)
  // the data's already been written to {dir}/package.json
  // now you can do stuff with it
});