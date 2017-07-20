import { action, observable, computed } from 'mobx'

import dedent from 'dedent'
import log from 'npmlog'
import path from 'path'
import semver from 'semver'
import npmSafeName from 'npm-safe-name'

// import dependencyIsSatisfied from './utils/dependencyIsSatisfied'
// import NpmUtilities from './NpmUtilities'

export default class Package {
  @observable _scope
  @observable _name

  constructor(pkg, srcLocation, buildLocation) {
    this._sourceLocation = srcLocation
    this._buildLocation = buildLocation
    this.init(pkg)
  }

  @action
  init = (pkg) => {
    this._package = pkg
    const { name, scope } = npmSafeName(pkg.name)
    this._scope = scope
    this._name = name
  }

  @computed
  get name() {
    return this._name
  }

  @computed
  get scope() {
    return this._scope
  }

  get npmName() {
    return this._package.name
  }

  get scopedName() {
    return npmSafeName(this._package.name)
  }

  get sourceLocation() {
    return this._sourceLocation
  }

  get buildLocation() {
    return this._buildLocation
  }

  get nodeModulesLocation() {
    return path.join(this._sourceLocation, 'node_modules')
  }

  get version() {
    return this._package.version
  }

  set version(version) {
    this._package.version = version
  }

  get bin() {
    return this._package.bin
  }

  get dependencies() {
    return this._package.dependencies
  }

  get devDependencies() {
    return this._package.devDependencies
  }

  get peerDependencies() {
    return this._package.peerDependencies
  }

  get allDependencies() {
    return Object.assign(
      {},
      this.devDependencies,
      this.dependencies
    )
  }

  get scripts() {
    return this._package.scripts || {}
  }

  isPrivate() {
    return !! this._package.private
  }

  toJSON() {
    return this._package
  }

  // /**
  //  * Run a NPM script in this package's directory
  //  * @param {String} script NPM script to run
  //  * @param {Function} callback
  //  */
  // runScript(script, callback) {
  //   log.silly('runScript', script, this.name)
  //
  //   if (this.scripts[script]) {
  //     NpmUtilities.runScriptInDir(script, [], this.location, callback)
  //   } else {
  //     callback()
  //   }
  // }

  /**
   * Determine if a dependency version satisfies the requirements of this package
   * @param {Package} dependency
   * @param {Boolean} doWarn
   * @returns {Boolean}
   */
  hasMatchingDependency(dependency, doWarn) {
    log.silly('hasMatchingDependency', this.name, dependency.name)

    const expectedVersion = this.allDependencies[dependency.name]
    const actualVersion = dependency.version

    if (! expectedVersion) {
      return false
    }

    // check if semantic versions are compatible
    if (semver.satisfies(actualVersion, expectedVersion)) {
      return true
    }

    if (doWarn) {
      log.warn(this.name, dedent`
        depends on '${dependency.name}@${expectedVersion}'
        instead of '${dependency.name}@${actualVersion}'
      `)
    }

    return false
  }

}
