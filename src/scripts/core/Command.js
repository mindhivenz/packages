import log from 'npmlog'

import config from '../commands/config'
import { newLogger } from '../utils/CliUtils'
import { EXEC, INIT } from '../core/Codes'
import PackageUtilities from '../package/PackageUtilities'

log.addLevel('success', 3001, { fg: 'green', bold: true })

const DEFAULT_CONCURRENCY = 4

export function commandNameFromClassName(className) {
  return className.replace(/Command$/, '').toLowerCase()
}

export default class Command {
  _cwd
  constructor(input, flags, cwd) {
    this._cwd = cwd
    log.pause()
    this.logger = newLogger(this.name)

    if (flags.loglevel) {
      log.level = flags.loglevel
    }

    this.input = input
    this.logger.info('input', input)
    this.logger.silly('flags', flags)

    this._flags = flags

    this.config = config

    this.allPackages = PackageUtilities.getPackages()

    log.resume()
  }

  get concurrency() {
    return this.getConcurrency()
  }

  getConcurrency = () => {
    if (! this._concurrency) {
      const { concurrency } = this.options
      this._concurrency = Math.max(1, +concurrency || DEFAULT_CONCURRENCY)
    }

    return this._concurrency
  }

  get name() {
    // For a class named "FooCommand" this returns "foo".
    return commandNameFromClassName(this.className)
  }

  get className() {
    return this.constructor.name
  }

  get version() {
    return this.config.version
  }

  createTask = TaskClass => new TaskClass(this)

  run() {
    this.runValidations()
    this.runPreparations()
    this.runCommand()
  }

  runValidations() { }

  runPreparations() { }

  async runCommand() {
    let initResult
    try {
      initResult = await this.initialize()
      this._complete(initResult, await this.execute())
    } catch (err) {
      this._handleError(INIT, err)
    }
  }


  _complete(initResult, execResult) {
    this.logger.silly(INIT, initResult)
    this.logger.silly(EXEC, execResult)
  }

  _handleError(code, err) {
    this.handleError(code, err)
  }

  handleError(code, err) {
    this.logger.error(code, err)
  }

  async initialize() {
    throw new Error('command.initialize() needs to be implemented.')
  }

  async execute() {
    throw new Error('command.execute() needs to be implemented.')
  }
}

