import init from 'init-package-json'
import path from 'path'
import ncp from 'ncp'
import exit from 'shelljs'

import { packageExists, getAllPackageNames } from './lib/packageUtils'
import config from './lib/config'

import {
  logBr,
  log,
  logSuccess,
  logError,
  logWarn,
  logTitle,
  logPackage,
} from './lib/utils'

const newPackageName = `${process.argv[2]}`
process.newPackageName = newPackageName

const packagesDirectory = path.resolve(config.sourcePath)
const initDirectory = path.resolve(config.defaultsPath)
const initFile = path.resolve(initDirectory, 'npm-init-defaults.js')
const defaultPackageDir = path.resolve(initDirectory, 'default-package')
const newPackageDir = path.resolve(packagesDirectory, newPackageName)

try {
  logBr()
  logTitle('                                        ')
  logTitle('        Create @mindhive/package        ')
  logTitle('                                        ')
  logBr()

  if (packageExists(newPackageDir)) {
    logWarn(`Package directory already exists: ${newPackageDir}`)
    logWarn('Existing packages:')
    getAllPackageNames.forEach(log)

    exit(0)
  }
  logPackage(`@mindhive/${newPackageName}`)
  ncp(defaultPackageDir, newPackageDir)
  init(newPackageDir, initFile, { '__pn': newPackageName }, () => {})
  logSuccess('Done!')
} catch (err) {
  logError(err)
}

