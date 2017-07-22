import log from 'npmlog'
import kebabCase from 'lodash/kebabCase'
import config from '../commands/config'
import { newLogger } from '../utils/CliUtils'

export function nameFromClassName(className) {
  if (className.includes('Command')) {
    return className.replace(/Command$/, '').toLowerCase()
  }
  return kebabCase(className.replace(/Task$/, '')).toLowerCase()
}

export default class MhpTask {
  _cwd

  constructor(cwd) {
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

  run() {
    this._execLifecycle()
  }

  runTask(callback) {
    this._execLifecycle(callback)
  }

  _execLifecycle(callback) {
    this._attempt('initialize', () => {
      this._attempt('execute', () => {
        this._complete(null, 0, callback)
      }, callback)
    }, callback)
  }

  _attempt(method, next, callback) {
    try {
      log.silly(method, 'attempt')

      this[method]((err, completed) => {
        if (err) {
          log.error(method, 'callback with error\n', err)
          this._complete(err, 1, callback)
        } else if (! completed) {
          log.verbose(method, 'exited early')
          this._complete(null, 1, callback)
        } else {
          log.silly(method, 'success')
          next()
        }
      })
    } catch (err) {
      log.error(method, 'caught error\n', err)
      this._complete(err, 1, callback)
    }
  }

  _complete(err, code, callback) {
    // if (code !== 0) {
    // }

    const finish = () => {
      if (callback) {
        callback(err, code)
      }

    }
    finish()
  }

  initialize() {
    throw new Error('command.initialize() needs to be implemented.')
  }

  execute() {
    throw new Error('command.execute() needs to be implemented.')
  }

}
