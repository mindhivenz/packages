import log from 'npmlog'
import kebabCase from 'lodash/kebabCase'
import config from '../commands/config'
import { newLogger } from '../utils/CliUtils'

export function nameFromClassName(className) {
  return kebabCase(className.replace(/Task$/, '')).toLowerCase()
}

export default class AsyncTask {
  command

  constructor(command) {
    log.pause()

    this.command = command
    this.logger = newLogger(this.name)
    this.logger.info('task', this.name)
    this.logger.silly('command', this.command)

    this.config = config
    this.mhpVersion = this.config.version

    log.resume()
  }

  get className() {
    return this.constructor.name
  }

  get name() {
    return nameFromClassName(this.className)
  }

  run = async (...props) => await this.execute(...props)

  async execute() { // eslint-disable-line no-unused-vars
    throw new Error('task.execute() needs to be implemented.')
  }

}
