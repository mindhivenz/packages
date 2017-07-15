import init from 'init-package-json'
import path from 'path'
import fs from 'fs'
import ncp from 'ncp'
import exit from 'shelljs'

import {
  logBr,
  logSuccess,
  logError,
  logWarn,
  logTitle,
  logPackage,
} from './lib/utils'

const newPackageName = `${process.argv[2]}`
process.newPackageName = newPackageName

const packagesDirectory = path.resolve(',/src/packages')
const initDirectory = path.resolve('init')
const initFile = path.resolve(initDirectory, 'npm-init-defaults.js')
const defaultPackageDir = path.resolve(initDirectory, 'default-package')
const newPackageDir = path.resolve(packagesDirectory, newPackageName)

try {
  logBr()
  logTitle('                                        ')
  logTitle('        Create @mindhive/package        ')
  logTitle('                                        ')
  logBr()

  if (! fs.existsSync(newPackageDir)) {
    logPackage(`@mindhive/${newPackageName}`)
    ncp(defaultPackageDir, newPackageDir)
    init(newPackageDir, initFile, { '__pn': newPackageName }, () => {})
  } else {
    logWarn(`Package directory already exists: ${newPackageDir}`)
    exit(0)
  }
  logSuccess('Done!')
} catch (err) {
  logError(err)
}

