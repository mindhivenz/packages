import init from 'init-package-json'
import path from 'path'
import { exit, cp } from 'shelljs'

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
const initFile = path.resolve('src', 'npm-init-defaults.js')
const basePackage = path.resolve(config.basePackage)
const newPackageDir = path.resolve(packagesDirectory, newPackageName)

try {
  logBr()
  logTitle('                                        ')
  logTitle('        Create @mindhive/package        ')
  logTitle('                                        ')
  logBr()

  if (packageExists(newPackageName)) {
    logWarn(`Package directory already exists: ${config.sourcePath}/${newPackageName}`)
    logWarn('Existing packages:')
    getAllPackageNames().forEach((p) => {
      p === newPackageName ? logError(p) : log(p)
    })
    logBr()

    exit(0)
  }
  logPackage(`@mindhive/${newPackageName}`)

  cp('-Rf', basePackage, newPackageDir)
  init(newPackageDir, initFile, { '__pn': newPackageName }, () => {})
  logSuccess('Done!')
} catch (err) {
  logError(err)
}

