import init from 'init-package-json'
import path from 'path'
import { exit, cp } from 'shelljs'

import { packageExists, getAllPackageNames, packageFullName } from './lib/packageUtils'
import config from './lib/config'
import PromptUtilities from './utils/PromptUtilities'

import inputPackageData from './commands/inputNewPackageFields'

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
const basePackage = path.resolve(config.basePackage)
const newPackageDir = path.resolve(packagesDirectory, newPackageName)


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
    newPackageName = packageData.name

    logSuccess('Creating new package:')
    logPackage(packageFullName(packageData.scope, packageData.name))

    exit(0)


    // const packageData = await PromptUtilities.prompt(questions(await getAuthor()))
    // const packageData = await inquirer.prompt(questions(await getAuthor()))
    logSuccess(JSON.stringify(packageData, null, '  '))

    newPackageName = packageData.name

    logSuccess(newPackageName)

    exit(0)

    if (packageExists(newPackageName)) {
      logWarn(`Package directory already exists: ${config.sourcePath}/${newPackageName}`)
      logWarn('Existing packages:')
      getAllPackageNames().forEach((p) => {
        p === newPackageName ? logError(p) : log(p)
      })
      logBr()

      exit(0)
    }
    logPackage(`@mindhive/${newPackageName}`)

    cp('-Rf', basePackage, newPackageDir)
    init(newPackageDir, initFile, { '__pn': newPackageName }, () => {})
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

