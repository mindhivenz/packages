// import path from 'path'
// import { exit } from 'shelljs'
// import semver from 'semver'

// import { getSourceDir } from '../package/packageUtils'
// import config from '../tasks/config'
import getVersionsForPackages from '../tasks/getVersionsForPackages'
import PackageUtilities from '../package/PackageUtilities'

// import PromptUtilities from '../utils/PromptUtilities'
// import fsUtils from '../utils/FileSystemUtilities'

// import createNewPackageJson from '../tasks/createNewPackageJson'

import Command from './Command'

import {
  // logBr,
  log,
  // logSuccess,
  // logWarn,
  logHeader,
  // logPackage,
} from '../utils/CliUtils'

// const newPackageName = `${process.argv[2]}`
// const basePackage = path.resolve(config.basePackage, 'src')

export default class NewCommand extends Command {
  get requiresGit() {
    return false
  }

  async initialize(callback) {
    logHeader('Publish @mindhive/package')
    const packages = PackageUtilities.getPackages()
    getVersionsForPackages(packages, (versions) => {
      packages.forEach((pkg) => {
        log(pkg.npmName, versions[pkg.npmName])
      })
    })
    callback(null, false)
  }

  execute(callback) {
    callback(null, true)

  }

}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

