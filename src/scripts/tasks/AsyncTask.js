import log from 'npmlog'
import kebabCase from 'lodash/kebabCase'
import config from '../commands/config'
import { newLogger } from '../utils/CliUtils'

export function nameFromClassName(className) {
  return kebabCase(className.replace(/Task$/, '')).toLowerCase()
}

export default class AsyncTask {

  constructor() {
    console.log('AsyncTask')
    log.pause()
    this.logger = newLogger(this.name)

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

  run = props => this._execLifecycle(props)

  _execLifecycle = async props => await this._execute(await this._initialize(props))


  _initialize = props => new Promise((resolve, reject) => this.initialize(props, resolve, reject))
  _execute = data => new Promise((resolve, reject) => this.execute(data, resolve, reject))

  initialize(props, resolve) {
    resolve(props)
  }

  execute() {
    throw new Error('task.execute() needs to be implemented.')
  }

}
