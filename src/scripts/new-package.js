import init from 'init-package-json'
import path from 'path'
import pick from 'lodash/pick'
import { exit, cp } from 'shelljs'

import { packageExists, getAllPackageNames, packageFullName } from './lib/packageUtils'
import config from './lib/config'
import PromptUtilities from './utils/PromptUtilities'

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

let newPackageName = `${process.argv[2]}`
const packagesDirectory = path.resolve(config.sourcePath)
const initFile = path.resolve('src', 'npm-init-defaults.js')
const basePackage = path.resolve(config.basePackage, 'src')


async function askQuestions() {

  logHeader('Create @mindhive/package')
  let proceed = false
  let packageData = { name: newPackageName }
  try {
    while (! proceed) {
      packageData = await inputPackageData(packageData)
      logBr()
      logSuccess('New package details:')
      logPackage(packageFullName(packageData.scope, packageData.name))
      log(`Author: ${packageData.author}`)
      log(`Description: ${packageData.description}`)
      log(`Key words: ${packageData.keywords}`)
      proceed = await PromptUtilities.confirm('Create package from above data?', true)
      if (proceed === 'quit') {
        logWarn('Quit without creating package!')
        exit(0)
      }

    }
    const newPackageDir = path.resolve(packagesDirectory, packageData.name)

    logSuccess('Creating new package:')
    const fullPackageName = packageFullName(packageData.scope, packageData.name)
    logPackage(fullPackageName)
    log(`In: ${newPackageDir}`)

    cp('-Rf', basePackage, newPackageDir)

    createNewPackageJson(newPackageDir, {
      name: fullPackageName,
      ...pick(packageData, ['author', 'description', 'keywords']),
    })

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

