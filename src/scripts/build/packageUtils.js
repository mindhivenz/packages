import fs from 'fs'
import path from 'path'
import jsonfile from 'jsonfile'

import {
  logError,
  fileExists,
  isDirectory,
} from './utils'

import {
  config,
  CONFIG_PATH,
} from './config'

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

export const getSourceDir = packageName => path.resolve(config.sourcePath, packageName)
export const getOutDir = packageName => path.resolve(config.outPath, packageName)

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
  const src = packageData(getSourceDir(name))
  return {
    name,
    npmName: `@mindhive/${name}`,
    version: src.version,
    src,
    out: packageData(getOutDir(name)),
  }
}

export const getPackageNames = () => makePackageNames(config.sourcePath)
export const getBuiltPackageNames = () => makePackageNames(config.outPath)


export default () => getPackageNames().map(makePackageObj)

