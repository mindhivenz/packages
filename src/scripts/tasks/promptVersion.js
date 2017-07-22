import semver from 'semver'
import PromptUtilities from '../utils/PromptUtilities'

// import PromptUtilities from '../utils/PromptUtilities'

export default async (packageName, currentVersion) => {
  // console.log('promptVersion', packageName, currentVersion)

  const patch = semver.inc(currentVersion, 'patch')
  const minor = semver.inc(currentVersion, 'minor')
  const major = semver.inc(currentVersion, 'major')
  const prepatch = semver.inc(currentVersion, 'prepatch')
  const preminor = semver.inc(currentVersion, 'preminor')
  const premajor = semver.inc(currentVersion, 'premajor')


  let message = 'Select a new version'
  if (packageName) message += ` for ${packageName}`
  message += ` (currently ${currentVersion})`

  const choice = await PromptUtilities.select(message, [
      { value: patch, name: `Patch (${patch})` },
      { value: minor, name: `Minor (${minor})` },
      { value: major, name: `Major (${major})` },
      { value: prepatch, name: `Prepatch (${prepatch})` },
      { value: preminor, name: `Preminor (${preminor})` },
      { value: premajor, name: `Premajor (${premajor})` },
      { value: 'PRERELEASE', name: 'Prerelease' },
      { value: 'CUSTOM', name: 'Custom' },
      { value: 'SKIP', name: 'Skip this package' },
  ])

  switch (choice) {

    case 'CUSTOM': {
      return await PromptUtilities.input('Enter a custom version', {
        filter: semver.valid,
        validate: v => v !== null || 'Must be a valid semver version',
      })
    }

    case 'PRERELEASE': {
      const components = semver.prerelease(currentVersion)
      let existingId = null
      if (components && components.length === 2) {
        existingId = components[0]
      }
      const defaultVersion = semver.inc(currentVersion, 'prerelease', existingId)
      const prompt = `(default: ${existingId ? `"${existingId}"` : 'none'}, yielding ${defaultVersion})`

      return await PromptUtilities.input(`Enter a prerelease identifier ${prompt}`, {
        filter: (v) => {
          const prereleaseId = v || existingId
          return semver.inc(currentVersion, 'prerelease', prereleaseId)
        },
      })
    }

    default: {
      return choice
    }

  }
}

