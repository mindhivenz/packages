import path from 'path'
import { exit } from 'shelljs'

import { getSourceDir } from '../package/packageUtils'
import config from '../tasks/config'
import PromptUtilities from '../utils/PromptUtilities'
import fsUtils from '../utils/FileSystemUtilities'

import inputPackageData from '../tasks/inputNewPackageFields'
import confirmPackageData from '../tasks/confirmNewPackageData'
import createNewPackageJson from '../tasks/createNewPackageJson'

import Command from './Command'

import {
  logBr,
  log,
  logSuccess,
  newTracker,
  logWarn,
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
    this.tracker = newTracker('new')

    this.packageData = { packageName: newPackageName || null }
    try {
      while (! proceed) {
        this.packageData = await inputPackageData(this.packageData)
        // proceed = confirmPackageData(this.packageData)
        logBr()
        log('Package to be created:')
        this.tracker.info('name        ', this.packageData.name)
        this.tracker.info('version     ', this.packageData.version)
        this.tracker.info('author      ', this.packageData.author)
        this.tracker.info('description ', this.packageData.description)
        // log(`Key words: ${packageData.keywords}`)
        proceed = await PromptUtilities.confirm('Do you want to create this package?', true)
        if (proceed === 'quit') {
          logWarn('Quit without creating package!')
          exit(0)
        }

      }
    } catch (err) {
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
    callback(null, true)

  }
}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

