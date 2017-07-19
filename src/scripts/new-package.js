import path from 'path'
import { exit, cp } from 'shelljs'

import { packageFullName, getSourceDir } from './lib/packageUtils'
import config from './lib/config'
import PromptUtilities from './utils/PromptUtilities'
import fsUtils from './utils/FileSystemUtilities'

import inputPackageData from './commands/inputNewPackageFields'
import createNewPackageJson from './commands/createNewPackageJson'

import {
  logBr,
  log,
  logSuccess,
  logError,
  logWarn,
  logHeader,
  logPackage,
} from './lib/utils'

const newPackageName = `${process.argv[2]}`
const basePackage = path.resolve(config.basePackage, 'src')

async function askQuestions() {

  logHeader('Create @mindhive/package')
  let proceed = false
  let packageData = { packageName: newPackageName }
  try {
    while (! proceed) {
      packageData = await inputPackageData(packageData)
      logBr()
      packageData.name = packageFullName(packageData.packageScope, packageData.packageName)
      logSuccess('New package details:')
      logPackage(packageData.name)
      log(`Author: ${packageData.author}`)
      log(`Description: ${packageData.description}`)
      // log(`Key words: ${packageData.keywords}`)
      proceed = await PromptUtilities.confirm('Create package from above data?', true)
      if (proceed === 'quit') {
        logWarn('Quit without creating package!')
        exit(0)
      }

    }

    const newPackageDir = getSourceDir(packageData.packageName)

    logSuccess('Creating new package:')
    logPackage(packageData.name)
    log(`In: ${newPackageDir}`)

    fsUtils.copySync(basePackage, newPackageDir)

    createNewPackageJson(newPackageDir, packageData)

    logSuccess('Done!')

  } catch (err) {
    console.log('fetch failed', err)
  }
}
try {
  askQuestions()
} catch (err) {
  logError(err)
}

