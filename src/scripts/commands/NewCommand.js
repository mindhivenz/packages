import createNewPackage from '../tasks/createNewPackage'
import ProcessPackageDataTask from '../tasks/ProcessPackageDataTask'
import ConfirmPackageDataTask from '../tasks/ConfirmPackageDataTask'
import PromptUtilities from '../utils/PromptUtilities'

import Command from '../core/Command'
import { QUIT, INIT } from '../core/Codes'

import {
  logBr,
  logSuccess,
  logHeader,
} from '../utils/CliUtils'

export default class NewCommand extends Command {
  get requiresGit() {
    return false
  }

  async initialize() {
    logHeader('Create @mindhive/package')
    this.packageData = await PromptUtilities.processUntilConfirm(
      { packageName: this.input[0] || null },
      new ProcessPackageDataTask(),
      new ConfirmPackageDataTask()
    )
  }

  async execute() {
    const success = await createNewPackage(this.config.basePackageSource, this.packageData, this.logger)
    if (success) logSuccess('Package created successfully')
    logBr()
  }

  handleExit(code, err) {
    if (INIT === code && QUIT === err) {
      logBr()
      this.logger.warn('Quit without creating package!')
      logBr()
    }
  }

}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

