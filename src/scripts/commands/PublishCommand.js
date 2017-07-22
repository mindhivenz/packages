import ConfirmVersionsTask from '../tasks/ConfirmVersionsTask'
import ProcessVersionsTask from '../tasks/ProcessVersionsTask'
import { printPackageVersions } from '../package/printVersionsConfirm'
import PackageUtilities from '../package/PackageUtilities'
import PromptUtilities from '../utils/PromptUtilities'

import { QUIT, INIT } from '../core/Codes'

import Command from '../core/Command'

import {
  logBr,
  log,
  logHeader,
} from '../utils/CliUtils'

export default class NewCommand extends Command {
  get requiresGit() {
    return false
  }

  async initialize() {
    logHeader('Publish @mindhive/package')
    const packages = PackageUtilities.getPackages()

    this.versions = await PromptUtilities.processUntilConfirm(packages,
      new ProcessVersionsTask(packages),
      new ConfirmVersionsTask(packages),
    )

    this.packages = PackageUtilities.filterSkippedPackages(packages, this.versions)
  }

  execute() {
    log('Execute command!')
    logBr()

    printPackageVersions(this.packages, this.versions, this.logger)
    logBr()
  }

  handleError(code, err) {
    if (INIT === code && QUIT === err) {
      logBr()
      this.logger.warn('Quit without publishing!')
      logBr()
    } else {
      super.handleError(code, err)
    }
  }


}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

