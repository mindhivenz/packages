/* eslint-disable import/no-dynamic-require, no-console */

const fs = require('fs')
const { exec: execJs } = require('shelljs')
const chalk = require('chalk')
const { flowRight: compose } = require('lodash')

const consoleLog = console.log.bind(console)

exports.log = compose(consoleLog, chalk.white)
exports.logSuccess = compose(consoleLog, chalk.reset.inverse.bold.white)
exports.logError = compose(consoleLog, chalk.red.bold)
exports.logTitle = compose(consoleLog, chalk.reset.bold.white.bgMagenta)

exports.exec = command => execJs(command, { silent: true }).code
exports.execLoud = command => execJs(command).code


exports.writeFile = (filepath, string) =>
  fs.writeFileSync(filepath, string, 'utf8')

