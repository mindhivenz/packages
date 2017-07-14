/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
const fs = require('fs')
const path = require('path')
const { exit, rm, cp, test } = require('shelljs')
const readline = require('readline-sync')
const semver = require('semver')
const glob = require('glob')
const cleanDestination = require('./build/cleanDestination').default
const compileSources = require('./build/compileSources').default
const copyAdditionalFiles = require('./build/copyAdditionalFiles').default

const {
  getSrcPackages,
} = require('./packageUtils')

const {
  log,
  logBr,
  logSuccess,
  logError,
  logTitle,
  logPackage,
} = require('./utils')

const buildPackage = (mhPackage) => {
  logBr()
  logPackage(`        ${mhPackage.npmName}        `)

  cleanDestination(mhPackage)
  compileSources(mhPackage)
  copyAdditionalFiles(mhPackage)

  logSuccess('Done!')
  logBr()
}

try {
  logBr()
  logTitle('                                            ')
  logTitle('        Building @mindhive/packages.        ')
  logTitle('                                            ')
  logBr()
  getSrcPackages().forEach(buildPackage)
} catch (error) {
  logError('Release failed due to an error', error)
}
