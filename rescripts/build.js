/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
const fs = require('fs')
const path = require('path')
const { exec, exit, rm, cp, test } = require('shelljs')
const chalk = require('chalk')
const { flowRight: compose } = require('lodash')
const readline = require('readline-sync')
const semver = require('semver')
const glob = require('glob')

const BIN = './node_modules/.bin'

const {
  PACKAGES_SRC_DIR,
  PACKAGES_OUT_DIR,
  getPackageNames,
} = require('./getPackageNames')

const BASE_PACKAGE_LOC = '../src/basePackage.json'

const consoleLog = console.log.bind(console)
const log = compose(consoleLog, chalk.white.bold)
const logSuccess = compose(consoleLog, chalk.green.bold)
const logError = compose(consoleLog, chalk.red.bold)

const writeFile = (filepath, string) =>
  fs.writeFileSync(filepath, string, 'utf8')

const buildPackage = (packageName) => {
  log(`Building ${packageName}...`)

  const versionLoc = path.resolve(PACKAGES_SRC_DIR, packageName, 'VERSION')
  const version = fs.readFileSync(versionLoc, 'utf8').trim()

  let nextVersion = readline.question(
    `Next version of ${packageName} (current version is ${version}): `
  )

  while (
    !(
      !nextVersion ||
      (semver.valid(nextVersion) && semver.gt(nextVersion, version))
    )
    ) {
    nextVersion = readline.question(
      `Must provide a valid version that is greater than ${version}, ` +
      'or leave blank to skip: '
    )
  }

  // log('Running tests...')
  //
  // if (exec('yarn run lint && yarn test').code !== 0) {
  //   logError('The test command did not exit cleanly. Aborting release.')
  //   exit(1)
  // }
  //
  // logSuccess('Tests were successful.')

  const sourceDir = path.resolve(PACKAGES_SRC_DIR, packageName)
  const outDir = path.resolve(PACKAGES_OUT_DIR, packageName)

  log('Cleaning destination directory...')
  rm('-rf', outDir)

  log('Compiling source files...')

  const sourceFiles = glob
    .sync(`${sourceDir}/**/*+(js|jsx)`, {
      ignore: `${sourceDir}/node_modules/**/*.js`,
    })
    .map(to => path.relative(sourceDir, to))

  exec(
    `cd ${sourceDir} && ` +
    'cross-env BABEL_ENV=cjs ' +
    `${path.resolve(BIN)}/babel ${sourceFiles.join(' ')} ` +
    `--out-dir ${path.resolve(outDir)}`,
    { silent: true }
  )

  log('Copying additional project files...')
  const additionalProjectFiles = ['README.md', '.npmignore']
  additionalProjectFiles.forEach(filename => {
    const src = path.resolve(sourceDir, filename)

    if (!test('-e', src)) return

    cp('-Rf', src, outDir)
  })

  log('Generating package.json...')
  const packageConfig = Object.assign(
    { name: packageName, version: nextVersion },
    require(BASE_PACKAGE_LOC),
    require(path.resolve(sourceDir, 'package.json'))
  )

  writeFile(
    path.resolve(outDir, 'package.json'),
    JSON.stringify(packageConfig, null, 2)
  )

  // const runRollup = build =>
  // 'cross-env BABEL_ENV=rollup rollup --config rescripts/rollup.config.js ' +
  // `--environment BUILD:${build},PACKAGE_NAME:${packageName}`
  // if (exec(`babel ${sourceDir} --out-dir ${outDir}`).code !== 0) {
  //   exit(1)
  // }
  logSuccess(`Finished: ${packageName}`)
}

try {
  const packageNames = getPackageNames()
  packageNames.forEach(buildPackage)
  // const packageName = `${process.argv[2]}`
  // if (packageName) {
  //   buildPackage(packageName)
  // } else {
  //   const packageNames = getPackageNames()
  //   packageNames.forEach(buildPackage)
  // }
} catch (error) {
  logError('Release failed due to an error', error)
}