/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
const fs = require('fs')
const path = require('path')
const { exit, cp, test } = require('shelljs')
const readline = require('readline-sync')
const semver = require('semver')

const {
  PACKAGES_SRC_DIR,
  PACKAGES_OUT_DIR,
  getBuiltPackageNames,
} = require('./getPackageNames')

const {
  log,
  logSuccess,
  logError,
  logTitle,

  exec,
  execLoud,

  writeFile,
} = require('./utils')

const publishPackage = (packageName) => {

  logTitle(`  Building ${packageName}...  `)

  const sourceDir = path.resolve(PACKAGES_SRC_DIR, packageName)
  const outDir = path.resolve(PACKAGES_OUT_DIR, packageName)

  const srcPackageJson = path.resolve(sourceDir, 'package.json')

  const version = JSON.parse(fs.readFileSync(srcPackageJson, 'utf8').trim()).version
  const releases = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease']
  const incVersion = release => semver.inc(version, release)
  const releaseLabels = releases.map(release => `${release} = ${incVersion(release)}`)

  log(`Update version of ${packageName} (current version is ${version}): `)
  const index = readline.keyInSelect(releaseLabels, 'Choose release [0..$<itemsCount>]: ', {
    cancel: 'Exit release',
    guide: false,
  })
  if (index === -1) {
    logError('Publish canceled!')
    exit(0)
  }
  const selectedRelease = releases[index]
  const nextVersion = incVersion(selectedRelease)

  if (! readline.keyInYN(`About to publish ${packageName}@${nextVersion} to npm. Sound good? `)) {
    log('OK. Stopping release.')
    exit(0)
  }

  if (exec(`cd ${sourceDir} && npm  --no-git-tag-version version ${selectedRelease}`) !== 0) {
    logError('Version failed. Aborting release.')
    exit(1)
  }

  log('Updating package.json...')
  if (test('-e', srcPackageJson)) {
    cp('-Rf', srcPackageJson, outDir)
  }

  log('Publishing...')
  // if (exec(`cd ${outDir} && npm publish`) !== 0) {
  //   logError('Publish failed. Aborting release.')
  //   exit(1)
  // }

  logSuccess(`${packageName}@${nextVersion} was successfully published.`)

  log('Committing changes...')
  // const newTagName = `v${nextVersion}`
  // exec(`git commit -m "${packageName} ${newTagName}"`)

  // if (packageName === 'recompose') {
  //   log(`Tagging release... (${newTagName})`)
  //   exec(`git tag ${newTagName}`)
  // }

  log('Pushing to GitHub...')
  // exec('git push')
  // exec('git push --tags')

  logSuccess('Done.')
}

try {
  const packageNames = getBuiltPackageNames()
  packageNames.forEach(publishPackage)
  // const packageName = `${process.argv[2]}`
  // if (packageName) {
  //   publishPackage(packageName)
  // } else {
  //   const packageNames = getPackageNames()
  //   packageNames.forEach(publishPackage)
  // }
} catch (error) {
  logError('Release failed due to an error', error)
}
