import ConfirmVersionsTask from '../tasks/ConfirmVersionsTask'
import RequestNewVersionsTask from '../tasks/RequestNewVersionsTask'
import PublishPackagesTask from '../tasks/PublishPackagesTask'
import PackageUtilities from '../package/PackageUtilities'
import PromptUtilities from '../utils/PromptUtilities'
import { printIgnoredPackages } from '../package/packageUtils'

import { QUIT, INIT } from '../core/Codes'

import Command from '../core/Command'

import {
  logBr,
  styleWhiteBold,
  logHeader,
} from '../utils/CliUtils'

export default class NewCommand extends Command {

  async initialize() {
    logHeader('Publish @mindhive/package')
    const packages = PackageUtilities.filterIncludedPackages(this.allPackages)
    printIgnoredPackages(PackageUtilities.filterIgnoredPackages(this.allPackages), this.logger)

    logBr()
    const versions = await PromptUtilities.processUntilConfirm({ packages },
      new RequestNewVersionsTask(this),
      new ConfirmVersionsTask(this),
    )

    this.publishPackagesTask = new PublishPackagesTask(this, PackageUtilities.filterSkippedPackages(packages, versions), versions)
  }

  async execute() {
    logBr()
    this.logger.info(styleWhiteBold('Publishing...'))
    this.publishPackagesTask
      .execute()
      .then(() => {
        logBr()
        this.logger.info('Done!!')
        logBr()
      }
    )

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

