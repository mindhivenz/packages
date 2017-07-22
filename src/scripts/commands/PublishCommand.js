import confirmVersions from '../tasks/confirmVersions'
import getVersionsForPackages from '../tasks/getVersionsForPackages'
import repeatUntilConfirm from '../tasks/repeatUntilConfirm'
import PackageUtilities from '../package/PackageUtilities'

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
    this.packages = PackageUtilities.getPackages()
    try {
      this.versions = await repeatUntilConfirm(
        () => getVersionsForPackages(this.packages),
        data => confirmVersions(this.packages, data, this.logger)
      )
    } catch (err) {
      this.logger.warn('Quit without creating package!')
      logBr()
      callback(null, false)
      return
    }
    callback(null, true)
  }

  execute(callback) {
    log('Execute command!')

    callback(null, true)
  }


}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

