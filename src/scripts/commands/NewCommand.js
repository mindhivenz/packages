import path from 'path'
import { exit } from 'shelljs'

import { packageFullName, getSourceDir } from '../package/packageUtils'
import config from '../lib/config'
import PromptUtilities from '../utils/PromptUtilities'
import fsUtils from '../utils/FileSystemUtilities'

import inputPackageData from '../lib/inputNewPackageFields'
import createNewPackageJson from '../lib/createNewPackageJson'

import Command from './Command'

import {
  logBr,
  log,
  logSuccess,
  logWarn,
  logHeader,
  logPackage,
} from '../utils/CliUtils'

const newPackageName = `${process.argv[2]}`
const basePackage = path.resolve(config.basePackage, 'src')

export default class NewCommand extends Command {
  get requiresGit() {
    return false
  }

  async initialize(callback) {
    logHeader('Create @mindhive/package')
    let proceed = false
    this.packageData = { packageName: newPackageName }
    try {
      while (! proceed) {
        this.packageData = await inputPackageData(this.packageData)
        logBr()
        this.packageData.name = packageFullName(this.packageData.packageScope, this.packageData.packageName)
        logSuccess('New package details:')
        logPackage(this.packageData.name)
        log(`Author: ${this.packageData.author}`)
        log(`Description: ${this.packageData.description}`)
        // log(`Key words: ${packageData.keywords}`)
        proceed = await PromptUtilities.confirm('Create package from above data?', true)
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

