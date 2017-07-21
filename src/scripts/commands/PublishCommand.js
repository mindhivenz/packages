// import path from 'path'
// import { exit } from 'shelljs'
// import semver from 'semver'

// import { getSourceDir } from '../package/packageUtils'
// import config from '../tasks/config'
import confirmVersions from '../tasks/confirmVersions'
import getVersionsForPackages from '../tasks/getVersionsForPackages'
import PackageUtilities from '../package/PackageUtilities'

// import PromptUtilities from '../utils/PromptUtilities'
// import fsUtils from '../utils/FileSystemUtilities'

// import createNewPackageJson from '../tasks/createNewPackageJson'

import Command from './Command'

import {
  logBr,
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
    getVersionsForPackages(packages, async (versions) => {
      if (! await confirmVersions(packages, versions, this.logger)) {
        this.logger.warn('Quit without creating package!')
        logBr()
        callback(null, false)
        return
      }
      callback(null, true)
    })
  }

  execute(callback) {
    log('Execute command!')

    callback(null, true)

  }


}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

