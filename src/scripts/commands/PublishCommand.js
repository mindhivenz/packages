import ConfirmVersionsTask from '../tasks/ConfirmVersionsTask'
import ProcessVersionsTask from '../tasks/ProcessVersionsTask'
import { printPackageVersions } from '../package/printVersionsConfirm'
import PackageUtilities from '../package/PackageUtilities'
import PromptUtilities from '../utils/PromptUtilities'
import { printIgnoredPackages } from '../package/packageUtils'

import { QUIT, INIT } from '../core/Codes'

import Command from '../core/Command'

import {
  logBr,
  log,
  logHeader,
} from '../utils/CliUtils'

export default class NewCommand extends Command {

  async initialize() {
    logHeader('Publish @mindhive/package')
    const packages = PackageUtilities.filterIncludedPackages(this.allPackages)
    printIgnoredPackages(PackageUtilities.filterIgnoredPackages(this.allPackages), this.logger)

    const versions = await PromptUtilities.processUntilConfirm({ packages },
      this.createTask(ProcessVersionsTask),
      this.createTask(ConfirmVersionsTask),
    )

    this.updates = {
      packages: PackageUtilities.filterSkippedPackages(packages, versions),
      versions,
    }
  }

  execute() {
    const { packages, versions } = this.updates
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

