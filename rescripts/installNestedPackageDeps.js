/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
const path = require('path')
const { exec } = require('shelljs')
const chalk = require('chalk')
const { flowRight: compose } = require('lodash')
const { getPackageNames, PACKAGES_SRC_DIR } = require('./getPackageNames.js')

const consoleLog = console.log.bind(console)
const log = compose(consoleLog, chalk.bold)
const logSuccess = compose(consoleLog, chalk.green.bold)

const packageNames = getPackageNames()

packageNames.forEach((packageName) => {
  log(`yarn install in ${packageName}`)
  const sourceDir = path.resolve(PACKAGES_SRC_DIR, packageName)
  exec(`cd ${sourceDir} && yarn`, { async: true })
})
