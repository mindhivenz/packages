const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')

const {
  logError,
  fileExists,
  isDirectory,
} = require('./utils')

const {
  config,
  CONFIG_PATH,
} = require('./config')

exports.PACKAGES_SRC_DIR = config.sourcePath
exports.PACKAGES_OUT_DIR = config.outPath

const ignorePackages = config.ignore

let packageNames

const makePackageNames = (DIR) => {
  if (! packageNames) {
    logError(`Ignoring packages (from ${CONFIG_PATH})`)
    ignorePackages.forEach(ignore => logError(` - ${ignore}`))
    packageNames = fs
      .readdirSync(DIR)
      .filter(file => isDirectory(path.resolve(DIR, file)))
      .filter(name => ignorePackages.indexOf(name) < 0)
  }
  return packageNames
}

exports.getSourceDir = packageName => path.resolve(config.sourcePath, packageName)
exports.getOutDir = packageName => path.resolve(config.outPath, packageName)

const packageJsonFileName = 'package.json'

const packageData = (packagePath) => {
  const packageJson = path.resolve(packagePath, packageJsonFileName)
  const exists = fileExists(packageJson)
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

exports.getPackageNames = () => makePackageNames(config.sourcePath)
exports.getBuiltPackageNames = () => makePackageNames(config.outPath)


exports.getSrcPackages = () => exports.getPackageNames().map(makePackageObj)

