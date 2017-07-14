/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
const { exec } = require('shelljs')
const chalk = require('chalk')
const { flowRight: compose } = require('lodash')
const { getPackageNames, getSourceDir } = require('./packageUtils.js')

const consoleLog = console.log.bind(console)
const log = compose(consoleLog, chalk.bold)
const logSuccess = compose(consoleLog, chalk.green.bold)

const packageNames = getPackageNames()

packageNames.forEach((packageName) => {
  log(`yarn install in ${packageName}`)
  const sourceDir = getSourceDir(packageName)
  exec(`cd ${sourceDir} && yarn`, { async: true })
})
