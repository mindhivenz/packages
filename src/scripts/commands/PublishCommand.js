import ConfirmVersionsTask from '../tasks/ConfirmVersionsTask'
import RequestNewVersionsTask from '../tasks/RequestNewVersionsTask'
import PublishPackagesTask from '../tasks/PublishSelectedPackagesTask'
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

class PublishCommand extends Command {

  async initialize() {
    logHeader('Publish @mindhive/package')
    printIgnoredPackages(PackageUtilities.filterIgnoredPackages(this.allPackages), this.logger)

    const availablePackages = PackageUtilities.filterIncludedPackages(this.allPackages)
    logBr()
    const versions = await PromptUtilities.processUntilConfirm({ packages: availablePackages },
      new RequestNewVersionsTask(this),
      new ConfirmVersionsTask(this),
    )

    const packagesToPublish = PackageUtilities.filterSkippedPackages(availablePackages, versions).updating
    this.publishTask = new PublishPackagesTask(this, packagesToPublish, versions)
  }

  async execute() {
    logBr()
    this.logger.info(styleWhiteBold('Publishing...'))
    this.publishTask.execute()
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
  return new PublishCommand(argv._, argv).run()
}

