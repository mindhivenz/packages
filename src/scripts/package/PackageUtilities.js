import glob from 'glob'
import minimatch from 'minimatch'
import path from 'path'
import readPkg from 'read-pkg'
import async from 'async'


import Package from './Package'
import config from '../commands/config'
import Errors from './Errors'

export const SKIP = 'SKIP'


function filterPackage(name, globs, negate = false) {
  let _globs = globs
  // If there isn't a filter then we can just return the package.
  if (! _globs) return true

  // Include/exlude with no arguments implies splat.
  // For example: `--hoist` is equivalent to `--hoist=**`.
  // The double star here is to account for scoped packages.
  if (_globs === true) _globs = '**'

  if (! Array.isArray(_globs)) _globs = [_globs]

  if (negate) {
    return _globs.every(_glob => 
      // console.log('negate', _glob, name)
       ! minimatch(name, _glob))
  }

  return _globs.some(_glob => 
    // console.log(_glob, name)
     minimatch(name, _glob))
  
}

export default class PackageUtilities {

  static getPackages() {
    const packages = []
    const globOpts = {
      cwd: config.rootPath,
      strict: true,
      absolute: true,
    }
    glob.sync(path.join(config.sourcePath, '*/'), globOpts)
      .forEach((globResult) => {
        // https://github.com/isaacs/node-glob/blob/master/common.js#L104
        // glob always returns '\\' as '/' in windows, so everyone
        // gets normalized because we can't have nice things.
        const packagePath = path.normalize(globResult)
        const buildDir = path.resolve(config.outPath, path.basename(packagePath))
        const packageJson = readPkg.sync(packagePath, { normalize: false })
        packages.push(new Package(packageJson, packagePath, buildDir))
      })


    return packages

  }

  /**
   * Filters a given set of packages and returns all packages that match the scope glob
   * and do not match the ignore glob
   *
   */
  static filterPackages(packagesToFilter, { scope, ignore }, negate = true) {
    let packages = packagesToFilter.slice()
    if (scope) {
      packages = packages.filter(pkg => filterPackage(pkg.npmName, scope))

      if (! packages.length) {
        throw new Errors.PackageNotFoundError(`No packages found that match '${scope}'`)
      }
    }

    if (ignore) {
      packages = packages.filter(pkg => filterPackage(pkg.npmName, ignore, negate))

      if (! packages.length) {
        throw new Errors.NoPackagesLeftError(`No packages remain after ignoring '${ignore}'`)
      }
    }

    return packages
  }


  static filterPackagesByName(packagesToFilter, name) {
    return this.filterPackages(packagesToFilter, { scope: name })
  }

  static filterIncludedPackages(packagesToFilter) {
    return this.filterPackages(packagesToFilter, { ignore: config.ignore })
  }


  static filterIgnoredPackages(packagesToFilter) {
    return this.filterPackages(packagesToFilter, { ignore: config.ignore }, false)
  }

  static filterSkippedPackages(allPackages, versions) {
    const updating = []
    const skipping = []
    allPackages.forEach((pkg, index) => {
      if (versions[index] !== SKIP) {
        updating.push(pkg)
      } else {
        skipping.push(pkg)
      }
    })
    return {
      updating: updating.length ? updating : undefined,
      skipping: skipping.length ? skipping : undefined,
    }
  }

  static runParallel(tasks, makeTask, concurrency, callback) {
    async.parallelLimit(tasks.map(makeTask), concurrency, callback)
  }


  static runParallelBatches(batches, makeTask, concurrency, callback) {
    async.series(batches.map(batch => (cb) => {
      async.parallelLimit(batch.map(makeTask), concurrency, cb)
    }), callback)
  }

}
