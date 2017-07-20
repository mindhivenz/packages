import glob from 'glob'
import minimatch from 'minimatch'
import path from 'path'
import readPkg from 'read-pkg'

import Package from './Package'
import config from '../lib/config'

/**
 * A predicate that determines if a given package name satisfies a glob.
 *
 * @param {!String} name The package name
 * @param {String|Array<String>} glob The glob (or globs) to match a package name against
 * @param {Boolean} negate Negate glob pattern matches
 * @return {Boolean} The packages with a name matching the glob
 */
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
    return _globs.every((_glob) => {
      console.log('negate', _glob, name)
      return ! minimatch(name, _glob)
    })
  }

  return _globs.some((_glob) => {
    console.log(_glob, name)
    return minimatch(name, _glob)
  })
  
}

export default class PackageUtilities {

  static getPackages() {
    const packages = []
    const globOpts = {
      cwd: config.rootPath,
      strict: true,
      absolute: true,
    }
    glob.sync(path.join(config.sourcePath, '**/package.json'), globOpts)
      .forEach((globResult) => {
        // https://github.com/isaacs/node-glob/blob/master/common.js#L104
        // glob always returns '\\' as '/' in windows, so everyone
        // gets normalized because we can't have nice things.
        const packageConfigPath = path.normalize(globResult)
        const packageDir = path.dirname(packageConfigPath)
        const packageJson = readPkg.sync(packageConfigPath, { normalize: false })
        packages.push(new Package(packageJson, packageDir))
      })

    return packages
  }

  /**
   * Filters a given set of packages and returns all packages that match the scope glob
   * and do not match the ignore glob
   *
   */
  static filterPackages(packagesToFilter, { scope, ignore }) {
    let packages = packagesToFilter.slice()
    if (scope) {
      packages = packages.filter(pkg => filterPackage(pkg.name, scope))

      if (! packages.length) {
        throw new Error(`No packages found that match scope '${scope}'`)
      }
    }

    if (ignore) {
      packages = packages.filter(pkg => filterPackage(pkg.name, ignore, true))

      if (! packages.length) {
        throw new Error(`No packages remain after ignoring '${ignore}'`)
      }
    }

    return packages
  }


  static filterIncludedPackages(packagesToFilter) {
    return this.filterPackages(packagesToFilter, { ignore: config.ignore }
    )
  }
}
