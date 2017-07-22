import createNewPackage from '../tasks/createNewPackage'
import ProcessPackageDataTask from '../tasks/ProcessPackageDataTask'
import ConfirmPackageDataTask from '../tasks/ConfirmPackageDataTask'
import PromptUtilities from '../utils/PromptUtilities'

import Command from '../core/Command'

import {
  logBr,
  logSuccess,
  logHeader,
} from '../utils/CliUtils'

export default class NewCommand extends Command {
  get requiresGit() {
    return false
  }

  async initialize(callback) {
    logHeader('Create @mindhive/package')
    try {
      this.packageData = await PromptUtilities.processUntilConfirm(
        { packageName: this.input[0] || null },
        new ProcessPackageDataTask(),
        new ConfirmPackageDataTask()
      )
    } catch (quit) {
      logBr()
      this.logger.warn('Quit without creating package!')
      logBr()
      callback(null, false)
      return
    }
    callback(null, true)
  }

  async execute(callback) {
    const success = await createNewPackage(this.config.basePackageSource, this.packageData, this.logger)
    if (success) logSuccess('Package created successfully')
    logBr()
    callback(null, success)
  }
}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

