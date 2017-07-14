/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
const fs = require('fs')
const path = require('path')
const { exit } = require('shelljs')
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

  // exec,
  // execLoud,

  writeFile,
} = require('./utils')

const publishPackage = (packageName) => {

  logTitle(`  Building ${packageName}...  `)

  const sourceDir = path.resolve(PACKAGES_SRC_DIR, packageName)
  const outDir = path.resolve(PACKAGES_OUT_DIR, packageName)

  const SRC_VERSION_LOC = path.resolve(sourceDir, 'VERSION')
  const PACKAGE_JSON_LOC = path.resolve(outDir, 'package.json')

  const version = fs.readFileSync(SRC_VERSION_LOC, 'utf8').trim()

  let nextVersion = readline.question(
    `Next version of ${packageName} (current version is ${version}): `, {
      defaultInput: version,
    }
  )

  while (! (! nextVersion || (semver.valid(nextVersion) && semver.gt(nextVersion, version)))) {
    nextVersion = readline.question(
      `Must provide a valid version that is greater than ${version}, ` +
      'or leave blank to skip: ', {
        defaultInput: version,
      }
    )
  }

  if (! nextVersion) nextVersion = version
  log(`About to publish ${packageName}@${nextVersion} to npm.`)
  if (! readline.keyInYN('Sound good? ')) {
    log('OK. Stopping release.')
    exit(0)
  }

  log('Updating package.json...')
  const packageConfig = Object.assign(
    {},
    require(PACKAGE_JSON_LOC),
    { version: nextVersion }
  )
  log('Updating package.json...', packageConfig)

  writeFile(
    PACKAGE_JSON_LOC,
    JSON.stringify(packageConfig, null, 2)
  )

  log('Publishing...')
  // if (exec(`cd ${outDir} && npm publish`).code !== 0) {
  //   logError('Publish failed. Aborting release.')
  //   exit(1)
  // }

  logSuccess(`${packageName}@${nextVersion} was successfully published.`)

  log('Updating VERSION file...')
  writeFile(SRC_VERSION_LOC, `${nextVersion}\n`)

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
