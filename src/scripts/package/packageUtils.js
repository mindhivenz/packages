import fs from 'fs'
import path from 'path'
import jsonfile from 'jsonfile'
import npmSafeName from 'npm-safe-name'

import fsUtils from '../utils/FileSystemUtilities'

import {
  logWarn,
  fileExists,
  isDirectory,
} from '../utils/utils'

import configObj, { CONFIG_PATH } from '../lib/config'

const ignorePackages = configObj.ignore

let allPackageNames
let includedPackageNames
let excludedPackageNames

export const printIgnoredPackages = (ignoredPackages) => {
  if (ignoredPackages.length > 0) {
    logWarn(`Ignoring packages (from ${CONFIG_PATH})`)
    ignoredPackages.forEach(ignore => logWarn(` - ${ignore.npmName}`))
  }
}
const makeSrcPackageNames = () => {
  if (! allPackageNames) {
    allPackageNames = fs
      .readdirSync(configObj.sourcePath)
      .filter(file => isDirectory(path.resolve(configObj.sourcePath, file)))
    includedPackageNames = allPackageNames
      .filter(name => ignorePackages.indexOf(name) < 0)
    excludedPackageNames = allPackageNames
      .filter(name => ignorePackages.indexOf(name) >= 0)
  }
  return includedPackageNames
}

makeSrcPackageNames()

export const getSourceDir = packageName => path.resolve(configObj.sourcePath, packageName)
export const getOutDir = packageName => path.resolve(configObj.outPath, packageName)

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
    scope: 'mindhive' ,
    name,
    npmName: `@mindhive/${name}`,
    version: src.version,
    src,
    out: packageData(getOutDir(name)),
  }
}


export const packageFullName = (scope, name) => npmSafeName(name, scope)

export const getPackageJson = jsonPath => jsonfile.readFileSync(jsonPath)

export const updatePackageJson = (jsonPath, data) => {
  const file = path.resolve(jsonPath, 'package.json')

  jsonfile.writeFileSync(file, Object.assign(
      {},
      data,
      getPackageJson(file),
    ),
    {
      spaces: 2 }
    )
}


export const packageDirExists = name => fsUtils.pathExistsSync(getSourceDir(name))
export const packageExists = name => allPackageNames.indexOf(name) >= 0
export const getAllPackageNames = () => allPackageNames
export const getIncludedPackageNames = () => includedPackageNames
export const getExcludedPackageNames = () => excludedPackageNames


export default () => includedPackageNames.map(makePackageObj)

