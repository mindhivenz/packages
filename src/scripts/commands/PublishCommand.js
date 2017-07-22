import getVersionsForPackages from '../tasks/getVersionsForPackages'
import printVersionsConfirm from '../tasks/printVersionsConfirm'
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
    this.packages = PackageUtilities.getPackages()
    try {
      this.versions = await PromptUtilities.repeatUntilConfirm(
        () => getVersionsForPackages(this.packages),
        data => printVersionsConfirm(this.packages, data, this.logger),
      )
    } catch (e) {
      this.logger.warn('Quit without publishing!')
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

