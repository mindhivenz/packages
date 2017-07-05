module.exports = {
  "name": prompt("Name", `@mindhive/${process.argv[2]}`, function (name) {
    return name
  }),
  "version": prompt("Version", '0.0.0', function (version) {
    return version
  }),
  "description": prompt("Description", '', function (desc) {
    return desc
  }),
  "keywords": prompt("Keywords", '', function (desc) {
    return desc
  }),
  "main": 'build/index.js',
  "git": 'git@github.com:mindhivenz/packages.git',
  "license": 'MIT',
  "homepage": "https://github.com/mindhivenz/packages",
  "bugs": {
    "url": "https://github.com/mindhivenz/packages/issues"
  },

}