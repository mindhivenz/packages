import _ from 'lodash'
import dedent from 'dedent'
import log from 'npmlog'

import MhpTask from '../tasks/MhpTask'

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

export default class Command extends MhpTask {

  constructor(input, flags, cwd) {
    super(cwd)
    log.pause()

    if (flags.loglevel) {
      log.level = flags.loglevel
    }

    this.input = input
    this._flags = flags
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
    super.run()
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
    super._execLifecycle(callback)
  }

}

