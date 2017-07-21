import inputPackageData from '../tasks/inputNewPackageFields'
import confirmPackageData from '../tasks/confirmNewPackageData'
import createNewPackage from '../tasks/createNewPackage'

import Command from './Command'

import {
  logBr,
  logError,
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

    let proceed = false

    this.packageData = { packageName: this.newPackageName || null }
    this.basePackage = this.config.basePackageSource

    try {
      while (! proceed) {
        this.packageData = await inputPackageData(this.packageData)
        proceed = await confirmPackageData(this.packageData, this.logger)
        if (proceed === 'quit') {
          this.logger.warn('Quit without creating package!')
          logBr()
          callback(null, false)
          return
        }

      }
    } catch (err) {
      logError(err)
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

