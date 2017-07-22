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

    const versions = await PromptUtilities.processUntilConfirm(packages,
      new ProcessVersionsTask(packages),
      new ConfirmVersionsTask(packages),
    )

    return {
      packages: PackageUtilities.filterSkippedPackages(packages, versions),
      versions,
    }
  }

  execute({ packages, versions }) {
    log('Execute command!')
    logBr()

    printPackageVersions(packages, versions, this.logger)
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

