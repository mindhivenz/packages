import fs from 'fs'
import { exec as execJs, test } from 'shelljs'
import chalk from 'chalk'
import { flowRight as compose } from 'lodash'
import npmlog from 'npmlog'

npmlog.heading = 'mhp'

const npmLogInfo = npmlog.info.bind(npmlog)
const npmLogError = npmlog.error.bind(npmlog)
const npmLogWarn = npmlog.warn.bind(npmlog)

export const log = compose(npmLogInfo, chalk.white)
export const logBr = () => npmLogInfo('')
export const logSuccess = compose(npmLogInfo, chalk.green.bold)
export const logError = compose(npmLogError, chalk.red.bold)
export const logWarn = compose(npmLogWarn, chalk.yellow.bold)
export const logPackage = compose(npmLogInfo, chalk.reset.bold.magenta)
export const logTitle = compose(npmLogInfo, chalk.reset.bold.bgBlue.white)

export const logHeader = (text) => {
  logBr()
  logTitle('                                        ')
  logTitle(`        ${text}        `)
  logTitle('                                        ')
  logBr()
}


export const exec = command => execJs(command, { silent: true }).code
export const execLoud = command => execJs(command).code
export const execAsync = (command, callback) => execJs(command, callback)

export const writeFile = (filepath, string) =>
  fs.writeFileSync(filepath, string, 'utf8')

export const fileExists = file => test('-e', file)
export const isDirectory = file => fs.statSync(file).isDirectory()

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
