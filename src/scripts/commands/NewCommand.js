import path from 'path'
import { exit } from 'shelljs'

import { getSourceDir } from '../package/packageUtils'
import config from '../tasks/config'
import fsUtils from '../utils/FileSystemUtilities'

import inputPackageData from '../tasks/inputNewPackageFields'
import confirmPackageData from '../tasks/confirmNewPackageData'
import createNewPackageJson from '../tasks/createNewPackageJson'

import Command from './Command'

import {
  log,
  logBr,
  logError,
  logSuccess,
  newTracker,
  logHeader,
  logPackage,
} from '../utils/CliUtils'

const newPackageName = process.argv[2]
const basePackage = path.resolve(config.basePackage, 'src')

export default class NewCommand extends Command {
  get requiresGit() {
    return false
  }

  async initialize(callback) {
    logHeader('Create @mindhive/package')
    let proceed = false
    const tracker = newTracker('new')

    this.packageData = { packageName: newPackageName || null }

    try {
      while (! proceed) {
        this.packageData = await inputPackageData(this.packageData)
        proceed = await confirmPackageData(this.packageData, tracker)
        if (proceed === 'quit') {
          tracker.warn('Quit without creating package!')
          logBr()
        }

      }
    } catch (err) {
      logError(err)
    }
    callback(null, true)
  }

  execute(callback) {
    const newPackageDir = getSourceDir(this.packageData.packageName)
    logSuccess('Creating new package:')
    logPackage(this.packageData.name)
    log(`In: ${newPackageDir}`)

    fsUtils.copySync(basePackage, newPackageDir)

    createNewPackageJson(newPackageDir, this.packageData)

    logSuccess('Done!')
    callback()

  }
}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

