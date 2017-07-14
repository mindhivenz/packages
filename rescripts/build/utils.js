/* eslint-disable import/no-dynamic-require, no-console */

const fs = require('fs')
const { exec: execJs, test } = require('shelljs')
const chalk = require('chalk')
const { flowRight: compose } = require('lodash')

const consoleLog = console.log.bind(console)

exports.log = compose(consoleLog, chalk.white)
exports.logBr = () => exports.log(' ')
exports.logSuccess = compose(consoleLog, chalk.green.bold)
exports.logError = compose(consoleLog, chalk.red.bold)
exports.logPackage = compose(consoleLog, chalk.reset.bold.magenta)
exports.logTitle = compose(consoleLog, chalk.reset.bold.bgBlue.white)

exports.exec = command => execJs(command, { silent: true }).code
exports.execLoud = command => execJs(command).code

exports.writeFile = (filepath, string) =>
  fs.writeFileSync(filepath, string, 'utf8')

exports.fileExists = file => test('-e', file)
exports.isDirectory = (file) => fs.statSync(file).isDirectory()

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
