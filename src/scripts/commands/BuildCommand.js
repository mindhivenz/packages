import cleanDestination from '../tasks/clean'
import compileSources from '../tasks/compileSources'
import copyFiles from '../tasks/copyFiles'
import selectSpecificPackage from '../tasks/selectSpecificPackage'

import { printIgnoredPackages } from '../package/packageUtils'

import {
  logBr,
  logHeader,
} from '../utils/CliUtils'

import PackageUtilities from '../package/PackageUtilities'

import SyncCommand from '../core/SyncCommand'

export default class BuildCommand extends SyncCommand {
  get requiresGit() {
    return false
  }

  async initialize(callback) {
    logHeader('Building @mindhive/packages.....')
    const packages = PackageUtilities.getPackages()
    const specifiedPackage = this.input[0]
    if (specifiedPackage) {
      this.packagesToBuild = selectSpecificPackage(packages, specifiedPackage, this.logger)
      if (this.packagesToBuild === null) {
        callback(null, false)
        return
      }
    } else {
      this.packagesToBuild = PackageUtilities.filterIncludedPackages(packages)
      printIgnoredPackages(PackageUtilities.filterIgnoredPackages(packages), this.logger)
    }

    this.additionalFiles = this.config.additionalFiles
    logBr()
    callback(null, true)
  }


  execute(callback) {
    const logger = this.logger
    logger.addWork(this.packagesToBuild.length * 3)
    PackageUtilities.runParallel(this.packagesToBuild, pkg => (cb) => {
      logger.package(pkg, 'Building package......')
      try {
        cleanDestination(pkg, logger)
        copyFiles(pkg, this.additionalFiles, logger)
        compileSources(pkg, logger, () => {
          logger.package(pkg, '...complete!')
          logger.completeWork(1)
          cb()
        })
      } catch (err) {
        logger.error(pkg.name, err)
        cb(err)
      }
    }, this.concurrency, (err) => {
      logBr()
      if (err) {
        logger.error('build', 'Failed!')
        logger.error(err)
        callback(err)
      } else {
        logger.info('build', 'Completed successfully!')
        callback(null, true)
      }
      logBr()
      logger.finish()
    })


  }
}

export function handler(argv) {
  return new BuildCommand(argv._, argv).run()
}

