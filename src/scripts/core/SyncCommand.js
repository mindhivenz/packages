import _ from 'lodash'
import dedent from 'dedent'
import log from 'npmlog'

import config from '../commands/config'
import { newLogger, logError, logBr } from '../utils/CliUtils'

// import ChildProcessUtilities from '../utils/ChildProcessUtilities'
// import FileSystemUtilities from '../utils/FileSystemUtilities'
// import GitUtilities from '../utils/GitUtilities'
// import PackageUtilities from '../package/PackageUtilities'
// import Repository from './Repository'
// import filterFlags from '../utils/filterFlags'
// import writeLogFile from '../utils/writeLogFile'
// import UpdatedPackagesCollector from './UpdatedPackagesCollector'

// handle log.success()
log.addLevel('success', 3001, { fg: 'green', bold: true })

const DEFAULT_CONCURRENCY = 4

export const builder = {
  'loglevel': {
    defaultDescription: 'info',
    describe: 'What level of logs to report.',
    type: 'string',
  },
  'concurrency': {
    describe: 'How many threads to use if lerna parallelises the tasks.',
    type: 'number',
    requiresArg: true,
  },
  'scope': {
    describe: dedent`
      Restricts the scope to package names matching the given glob.
      (Only for 'run', 'exec', 'clean', 'ls', and 'bootstrap' commands)
    `,
    type: 'string',
    requiresArg: true,
  },
  'since': {
    describe: dedent`
      Restricts the scope to the packages that have been updated since
      the specified [ref], or if not specified, the latest tag.
      (Only for 'run', 'exec', 'clean', 'ls', and 'bootstrap' commands)
    `,
    type: 'string',
    requiresArg: false,
  },
  'ignore': {
    describe: dedent`
      Ignore packages with names matching the given glob.
      (Only for 'run', 'exec', 'clean', 'ls', and 'bootstrap' commands)
    `,
    type: 'string',
    requiresArg: true,
  },
  'include-filtered-dependencies': {
    describe: dedent`
      Include all transitive dependencies when running a command, regardless of --scope, --since or --ignore.
    `,
  },
  'registry': {
    describe: 'Use the specified registry for all npm client operations.',
    type: 'string',
    requiresArg: true,
  },
  'sort': {
    describe: 'Sort packages topologically (all dependencies before dependents)',
    type: 'boolean',
    default: undefined,
  },
  'max-buffer': {
    describe: 'Set max-buffer(bytes) for Command execution',
    type: 'number',
    requiresArg: true,
  },
}
export function commandNameFromClassName(className) {
  return className.replace(/Command$/, '').toLowerCase()
}

export default class SyncCommand {
  _cwd
  constructor(input, flags, cwd) {
    this._cwd = cwd
    log.pause()
    this.logger = newLogger(this.name)
    logBr()
    logError('***************************************************************')
    logError('***************************************************************')
    logBr()
    this.logger.error(this.className)
    logError(' ./core/SyncCommand is depreciated, use:')
    logError(' ./core/Command')
    logBr()
    logError('***************************************************************')
    logError('***************************************************************')

    if (flags.loglevel) {
      log.level = flags.loglevel
    }

    this.input = input
    // this.logger.info('input', input)
    // this.logger.info('flags', flags)

    this._flags = flags

    // log.silly('input', input)
    // log.silly('flags',flags)
    // log.silly('flags', filterFlags(flags))

    this.config = config

    this.mhpVersion = this.config.version
    // this.repository = new Repository(cwd)

    log.resume()
  }

  get concurrency() {
    if (! this._concurrency) {
      const { concurrency } = this.options
      this._concurrency = Math.max(1, +concurrency || DEFAULT_CONCURRENCY)
    }

    return this._concurrency
  }

  get toposort() {
    if (! this._toposort) {
      const { sort } = this.options
      // If the option isn't present then the default is to sort.
      this._toposort = sort == null || sort
    }

    return this._toposort
  }

  get name() {
    // For a class named "FooCommand" this returns "foo".
    return commandNameFromClassName(this.className)
  }

  get className() {
    return this.constructor.name
  }

  get execOpts() {
    if (! this._execOpts) {
      this._execOpts = {
        cwd: this.repository.rootPath,
      }

      if (this.options.maxBuffer) {
        this._execOpts.maxBuffer = this.options.maxBuffer
      }
    }

    return this._execOpts
  }

  get requiresGit() {
    return true
  }

  // Override this to inherit config from another command.
  // For example `updated` inherits config from `publish`.
  get otherCommandConfigs() {
    return []
  }

  get options() {
    if (! this._options) {
      // Command config object is either "commands" or "command".
      // const { commands, command } = this.repository.lernaJson

      // The current command always overrides otherCommandConfigs
      // const lernaCommandOverrides = [
      //   this.name,
      //   ...this.otherCommandConfigs,
      // ].map(name => (commands || command || {})[name])

      this._options = _.defaults(
        {},
        // CLI flags, which if defined overrule subsequent values
        this._flags,
        // Namespaced command options from `lerna.json`
        // ...lernaCommandOverrides,
        // Global options from `lerna.json`
        // this.repository.lernaJson,
        // Command specific defaults
        this.defaultOptions,
        // Deprecated legacy options in `lerna.json`
        // this._legacyOptions()
      )
    }

    return this._options
  }

  get defaultOptions() {
    return {
      concurrency: DEFAULT_CONCURRENCY,
      sort: true,
    }
  }

  run() {
    log.info('version', this.mhpVersion)

    this.runValidations()
    this.runPreparations()
    this.runCommand()
  }

  runValidations() {
    // if (this.requiresGit && ! GitUtilities.isInitialized(this.execOpts)) {
    //   log.error('ENOGIT', 'This is not a git repository, did you already run `git init` or `lerna init`?')
    //   this._complete(null, 1)
    //   return
    // }

  }

  runPreparations() {
  }

  runCommand(callback) {
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
    if (code !== 0) {
      // writeLogFile(this.repository.rootPath)
    }

    const finish = function () {
      if (callback) {
        callback(err, code)
      }

    }
    finish()

    // const childProcessCount = ChildProcessUtilities.getChildProcessCount()
    // if (childProcessCount > 0) {
    //   log.warn(
    //     'complete',
    //     `Waiting for ${childProcessCount} child ` +
    //     `process${childProcessCount === 1 ? '' : 'es'} to exit. ` +
    //     'CTRL-C to exit immediately.'
    //   )
    //   ChildProcessUtilities.onAllExited(finish)
    // } else {
    //   finish()
    // }
  }

  initialize() {
    throw new Error('command.initialize() needs to be implemented.')
  }

  execute() {
    throw new Error('command.execute() needs to be implemented.')
  }
}

