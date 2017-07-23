import CreatePackageTask from '../tasks/CreatePackageTask'
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

  async initialize() {
    logHeader('Create @mindhive/package')
    const packageName = this.input.package
    console.log(this.input)
    this.packageData = await PromptUtilities.processUntilConfirm(
      { packageName: packageName || null },
      this.createTask(ProcessPackageDataTask),
      this.createTask(ConfirmPackageDataTask)
    )
  }

  async execute() {
    const success = await new CreatePackageTask().run(this.packageData)
    if (success) logSuccess('Done!')
    logBr()
  }

  handleError(code, err) {
    if (INIT === code && QUIT === err) {
      logBr()
      this.logger.warn('Quit without creating package!')
      logBr()
    } else {
      super.handleError(code, err)
    }
  }

}

export function handler(argv, callback) {
  return new NewCommand(argv).run().then(callback)
}

