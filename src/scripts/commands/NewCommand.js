import inputPackageData from '../tasks/inputNewPackageFields'
import printNewPackageDataConfirm from '../tasks/printNewPackageDataConfirm'
import createNewPackage from '../tasks/createNewPackage'
import repeatUntilConfirm from '../tasks/repeatUntilConfirm'
import PromptUtilities from '../utils/PromptUtilities'

import Command from './Command'

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
    this.newPackageName = this.input[0]


    this.packageData = { packageName: this.newPackageName || null }
    this.basePackage = this.config.basePackageSource
    try {
      this.packageData = await PromptUtilities.repeatUntilConfirm(
        () => inputPackageData(this.packageData),
        data => printNewPackageDataConfirm(data, this.logger),
      )
    } catch (e) {
      this.logger.warn('Quit without creating package!')
      logBr()
      callback(null, false)
      return
    }
    callback(null, true)
  }

  async execute(callback) {
    const success = await createNewPackage(this.basePackage, this.packageData, this.logger)
    if (success) logSuccess('Package created successfully')
    logBr()
    callback(null, success)
  }
}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

