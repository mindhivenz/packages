import getVersionsForPackages from '../tasks/getVersionsForPackages'
import printVersionsConfirm, { printPackageVersions } from '../package/printVersionsConfirm'
import PackageUtilities from '../package/PackageUtilities'
import PromptUtilities from '../utils/PromptUtilities'

import Command from './Command'

import {
  logBr,
  log,
  logHeader,
} from '../utils/CliUtils'

export default class NewCommand extends Command {
  get requiresGit() {
    return false
  }

  async initialize(callback) {
    logHeader('Publish @mindhive/package')
    const packages = PackageUtilities.getPackages()
    const logger = this.logger
    try {
      this.versions = await PromptUtilities.processUntilConfirm(
        () => getVersionsForPackages(packages),
        data => printVersionsConfirm(packages, data, logger),
      )
    } catch (e) {
      logger.warn('Quit without publishing!')
      logBr()
      callback(null, false)
      return
    }
    this.packages = PackageUtilities.filterSkippedPackages(packages, this.versions)
    callback(null, true)
  }

  execute(callback) {
    log('Execute command!')
    logBr()

    printPackageVersions(this.packages, this.versions, this.logger)
    logBr()

    callback(null, true)
  }


}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

