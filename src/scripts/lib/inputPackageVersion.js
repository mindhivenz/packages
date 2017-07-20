import npmSafeName from 'npm-safe-name'
import fullname from 'fullname'
import semver from 'semver'

import { packageDirExists } from '../package/packageUtils'
import PromptUtilities from '../utils/PromptUtilities'

const someSafeNpmName = 'valid-name'

const validateScope = scope => npmSafeName(someSafeNpmName, scope) !== null || 'Please enter a valid scope'

const validateDirNotExist = name => ! packageDirExists(name) || 'Package directory already exists'
const validateNmpName = name => npmSafeName(name) !== null || 'Please enter a valid name'

const validateName = (name) => {
  const valid = validateNmpName(name)
  if (typeof valid === 'string') return valid
  return validateDirNotExist(name)
}

const validateVersion = v => v !== null || 'Must be a valid semver version'

const promptVersion = async ({ currentVersion, name }) => {
  const patch = semver.inc(currentVersion, 'patch')
  const minor = semver.inc(currentVersion, 'minor')
  const major = semver.inc(currentVersion, 'major')
  const prepatch = semver.inc(currentVersion, 'prepatch')
  const preminor = semver.inc(currentVersion, 'preminor')
  const premajor = semver.inc(currentVersion, 'premajor')


  let message = 'Select a new version'
  if (name) message += ` for ${name}`
  message += ` (currently ${currentVersion})`

  const choice = await PromptUtilities.select(message,
    [
      { value: patch, name: `Patch (${patch})` },
      { value: minor, name: `Minor (${minor})` },
      { value: major, name: `Major (${major})` },
      { value: prepatch, name: `Prepatch (${prepatch})` },
      { value: preminor, name: `Preminor (${preminor})` },
      { value: premajor, name: `Premajor (${premajor})` },
      { value: 'PRERELEASE', name: 'Prerelease' },
      { value: 'CUSTOM', name: 'Custom' },
    ])
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
      const prompt = `(default: ${existingId ? `'${existingId}'` : 'none'}, yielding ${defaultVersion})`

      PromptUtilities.input(`Enter a prerelease identifier ${prompt}`, {
        filter: (v) => {
          const prereleaseId = v ? v : existingId
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
}

export default data => promptVersion(data)

