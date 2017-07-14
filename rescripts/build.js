/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
const fs = require('fs')
const path = require('path')
const { exit, rm, cp, test } = require('shelljs')
const readline = require('readline-sync')
const semver = require('semver')
const glob = require('glob')

const BIN = './node_modules/.bin'

const {
  getPackageNames,
  getSourceDir,
  getOutDir,
  getPackages,
} = require('./packageUtils')

const {
  log,
  logSuccess,
  logError,
  logTitle,

  exec,
  execLoud,

  writeFile,
} = require('./utils')

// const BASE_PACKAGE_LOC = '../src/basePackage.json'

const buildPackage = (packageName) => {
  logTitle(`  Building ${packageName}...  `)

  const sourceDir = getSourceDir(packageName)
  const outDir = getOutDir(packageName)

  // const srcPackageJson = path.resolve(sourceDir, 'package.json')
  // const version = JSON.parse(fs.readFileSync(srcPackageJson, 'utf8').trim()).version


  log('Cleaning destination directory...')
  rm('-rf', outDir)

  log('Compiling source files...')

  const sourceFiles = glob
    .sync(`${sourceDir}/**/*+(js|jsx)`, {
      ignore: `${sourceDir}/node_modules/**/*.js`,
    })
    .map(to => path.relative(sourceDir, to))

  const bCommand = `cd ${sourceDir} && ` +
    'cross-env BABEL_ENV=cjs ' +
    `${path.resolve(BIN)}/babel ${sourceFiles.join(' ')} ` +
    `--out-dir ${path.resolve(outDir)}`
  const bCode = exec(bCommand)
  if (bCode !== 0) {
    logError('...failed')
    exit(execLoud(bCommand))
  }


  log('Copying additional project files...')
  const additionalProjectFiles = ['README.md', '.npmignore', 'package.json']
  additionalProjectFiles.forEach((filename) => {
    const src = path.resolve(sourceDir, filename)

    if (!test('-e', src)) return

    cp('-Rf', src, outDir)
  })

//   log('Generating package.json...')
//   const packageConfig = Object.assign(
//     require(BASE_PACKAGE_LOC),
//     require(path.resolve(sourceDir, 'package.json'))
//   )
//
//   writeFile(
//     path.resolve(outDir, 'package.json'),
//     JSON.stringify(packageConfig, null, 2)
//   )
//
//   logSuccess(`  ${packageName} built successfully  `)
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
