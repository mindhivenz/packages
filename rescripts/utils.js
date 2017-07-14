/* eslint-disable import/no-dynamic-require, no-console */

const fs = require('fs')
const { exec: execJs } = require('shelljs')
const chalk = require('chalk')
const { flowRight: compose } = require('lodash')

const consoleLog = console.log.bind(console)

exports.NODE_BIN = './node_modules/.bin'

exports.log = compose(consoleLog, chalk.white)
exports.logBr = () => exports.log(' ')
exports.logSuccess = compose(consoleLog, chalk.green.bold)
exports.logError = compose(consoleLog, chalk.red.bold)
exports.logPackage = compose(consoleLog, chalk.reset.bold.white.bgMagenta)
exports.logTitle = compose(consoleLog, chalk.reset.bold.magenta.bgWhite)

exports.exec = command => execJs(command, { silent: true }).code
exports.execLoud = command => execJs(command).code


exports.writeFile = (filepath, string) =>
  fs.writeFileSync(filepath, string, 'utf8')

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
