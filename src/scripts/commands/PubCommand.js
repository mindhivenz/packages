import path from 'path'
import { exit } from 'shelljs'
import semver from 'semver'

import { packageFullName, getSourceDir } from '../package/packageUtils'
import config from '../tasks/config'
import PromptUtilities from '../utils/PromptUtilities'
import fsUtils from '../utils/FileSystemUtilities'

import inputPackageData from '../tasks/inputNewPackageFields'
import createNewPackageJson from '../tasks/createNewPackageJson'

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
    logHeader('Publish @mindhive/package')
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

  promptVersion(packageName, currentVersion, callback) {
    const patch = semver.inc(currentVersion, 'patch')
    const minor = semver.inc(currentVersion, 'minor')
    const major = semver.inc(currentVersion, 'major')
    const prepatch = semver.inc(currentVersion, 'prepatch')
    const preminor = semver.inc(currentVersion, 'preminor')
    const premajor = semver.inc(currentVersion, 'premajor')


    let message = 'Select a new version'
    if (packageName) message += ` for ${packageName}`
    message += ` (currently ${currentVersion})`

    PromptUtilities.select(message, {
      choices: [
        { value: patch, name: `Patch (${patch})` },
        { value: minor, name: `Minor (${minor})` },
        { value: major, name: `Major (${major})` },
        { value: prepatch, name: `Prepatch (${prepatch})` },
        { value: preminor, name: `Preminor (${preminor})` },
        { value: premajor, name: `Premajor (${premajor})` },
        { value: 'PRERELEASE', name: 'Prerelease' },
        { value: 'CUSTOM', name: 'Custom' },
      ],
    }, (choice) => {
      switch (choice) {

        case 'CUSTOM': {
          PromptUtilities.input('Enter a custom version', {
            filter: semver.valid,
            validate: v => v !== null || 'Must be a valid semver version',
          }, (input) => {
            callback(null, input)
          })
          break
        }

        case 'PRERELEASE': {
          const components = semver.prerelease(currentVersion)
          let existingId = null
          if (components && components.length === 2) {
            existingId = components[0]
          }
          const defaultVersion = semver.inc(currentVersion, 'prerelease', existingId)
          const prompt = `(default: ${existingId ? `"${existingId}"` : 'none'}, yielding ${defaultVersion})`

          PromptUtilities.input(`Enter a prerelease identifier ${prompt}`, {
            filter: (v) => {
              const prereleaseId = v || existingId
              return semver.inc(currentVersion, 'prerelease', prereleaseId)
            },
          }, (input) => {
            callback(null, input)
          })
          break
        }

        default: {
          callback(null, choice)
          break
        }

      }
    })
  }

}

export function handler(argv) {
  return new NewCommand(argv._, argv).run()
}

