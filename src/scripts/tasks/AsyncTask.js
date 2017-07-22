import log from 'npmlog'
import kebabCase from 'lodash/kebabCase'
import config from '../commands/config'
import { newLogger } from '../utils/CliUtils'

export function nameFromClassName(className) {
  return kebabCase(className.replace(/Task$/, '')).toLowerCase()
}

export default class AsyncTask {
  _cwd

  constructor(cwd) {
    console.log('AsyncTask')
    log.pause()
    this._cwd = cwd
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

  _execLifecycle = props => new Promise(async (resolve, reject) => {
    resolve(await this._execute(await this._initialize(props)).catch(reject))
  })


  _initialize = props => new Promise((resolve, reject) => this.initialize(props, resolve, reject))
  _execute = data => new Promise((resolve, reject) => this.execute(data, resolve, reject))

  // initialize()
  initialize() {
    throw new Error('task.initialize() needs to be implemented.')
  }

  // execute(resolve, reject)
  execute() {
    throw new Error('task.execute() needs to be implemented.')
  }

}
