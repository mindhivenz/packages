import chalk from 'chalk'
import { flowRight as compose } from 'lodash'
import npmlog from 'npmlog'
import stringLength from 'string-length'

npmlog.enableProgress()

const DEF_COLLUMS = 80
const TERMINAL_COLUMNS = process.stdout.columns || DEF_COLLUMS
npmlog.heading = ''
npmlog.addLevel('info', 2000, { fg: 'green' }, '')
npmlog.addLevel('warn', 4000, { fg: 'yellow' }, 'WARN')

// const npmLogInfo = npmlog.info.bind(npmlog)
const npmLogInfo = npmlog.info.bind(npmlog)
const npmLogError = npmlog.error.bind(npmlog)
const npmLogWarn = npmlog.warn.bind(npmlog)

const DONE = chalk.reset.inverse.bold.green(' DONE ')
const styleSuccess = chalk.keyword('lime').bold
const styleWhite = chalk.reset.white
const styleWhiteDim = styleWhite.dim
const styleWhiteBold = styleWhite.bold

export const stylePackage = chalk.reset.bold.magenta
export const stylePackagePrefix = ({ scope, name }, message) =>
  `${styleWhiteDim('@')}${styleWhite(scope)}${styleWhiteDim('/')}${stylePackage(name)} ${styleSuccess(message)}`
// `${styleWhiteBold('@')}${styleWhite(scope)}${styleWhiteBold('/')}${stylePackage(name)} ${styleSuccess(message)}`

export const newGroup = name => npmlog.newGroup(name)

export const newLogger = (name, group = 'mhp') => {
  const logger = newGroup(group).newItem(name)
  logger.package = (pkg, msg) => {
    logger.info(stylePackagePrefix(pkg, msg))
  }
  return logger
}
export const log = compose(npmLogInfo, styleWhite)
export const logBr = () => npmLogInfo('')
export const logSuccess = compose(npmLogInfo, styleSuccess)
export const logError = compose(npmLogError, chalk.red.bold)
export const logWarn = compose(npmLogWarn, chalk.yellow.bold)
export const logTitle = compose(npmLogInfo, chalk.reset.bold.bgBlue.white)

export const adjustToWidth = ({ str, width, char, style }) => {
  const _char = char || '.'
  const _style = style || chalk.dim
  if (! width) logError("Width needed for 'adjustToWidth'")
  const strs = str.match(new RegExp(`(.{1,${width}})`, 'g'))
  let lastString = strs[strs.length - 1]
  if (lastString.length < width) {
    lastString += Array(width - lastString.length).join(_style(_char))
  }
  return strs.slice(0, -1).concat(lastString).join('\n')
}

export const adjustToTerminalWidth = (str) => {
  const width = TERMINAL_COLUMNS - stringLength(DONE) + 1 // eslint-disable-line  no-mixed-operators
  return adjustToWidth({ str, width, style: styleWhite.dim })
}

const repeat = (char, times) => char.repeat(times)
const repeatSpace = times => repeat(' ', times)


export const logPackage = compose(npmLogInfo, stylePackage)


export const logPackageTitle = (scope, name) => {
  const _scope = `@${scope}`
  log(adjustToTerminalWidth(`${styleSuccess(_scope)}${styleWhiteBold('/')}${stylePackage(name)}`))
}


export const logHeader = (text) => {
  const width = 8 + stringLength(text) + 8
  logBr()
  logTitle(repeatSpace(width))
  logTitle(`${repeatSpace(8)}${text}${repeatSpace(8)}`)
  logTitle(repeatSpace(width))
  logBr()
}
