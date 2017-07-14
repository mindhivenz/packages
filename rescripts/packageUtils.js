const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const { exit, cp, test } = require('shelljs')

const {
  logError,
} = require('./utils')

exports.PACKAGES_SRC_DIR = './src/packages'
exports.PACKAGES_OUT_DIR = './packages'

const configPath = 'mhpac.json'
// const configPath = path.resolve('mhpac.json')
const ignorePackages = jsonfile.readFileSync(configPath).ignore

let names

const packageNames = (DIR) => {
  if (! names) {
    logError(`Ignoring packages (from ${configPath})`)
    ignorePackages.forEach(ignore => logError(` - ${ignore}`))
    names = fs
      .readdirSync(DIR)
      .filter(file => fs.statSync(path.resolve(DIR, file)).isDirectory())
      .filter(name => ignorePackages.indexOf(name) < 0)
  }
  return names
}

exports.getSourceDir = packageName => path.resolve(exports.PACKAGES_SRC_DIR, packageName)
exports.getOutDir = packageName => path.resolve(exports.PACKAGES_OUT_DIR, packageName)

const packageJsonFileName = 'package.json'

const packageData = (packagePath) => {
  const packageJson = path.resolve(packagePath, packageJsonFileName)
  const exists = test('-e', packageJson)
  const packageJsonData = exists ? jsonfile.readFileSync(packageJson) : {}
  return {
    exists,
    dir: packagePath,
    json: {
      path: packageJson,
      data: packageJsonData,
    },
  }
}

const makePackageObj = (name) => {
  const src = packageData(exports.getSourceDir(name))
  return {
    name,
    npmName: `@mindhive/${name}`,
    version: src.version,
    src,
    out: packageData(exports.getOutDir(name)),
  }
}

exports.getPackageNames = () => packageNames(exports.PACKAGES_SRC_DIR)
exports.getBuiltPackageNames = () => packageNames(exports.PACKAGES_OUT_DIR)


exports.getSrcPackages = () => packageNames(exports.PACKAGES_SRC_DIR).map(makePackageObj)

