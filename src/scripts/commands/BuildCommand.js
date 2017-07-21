import cleanDestination from '../tasks/clean'
import compileSources from '../tasks/compileSources'
import copyFiles from '../tasks/copyFiles'
import { printIgnoredPackages } from '../package/packageUtils'

import {
  logBr,
  logHeader,
} from '../utils/CliUtils'

import PackageUtilities from '../package/PackageUtilities'

import Command from './Command'

export default class BuildCommand extends Command {
  get requiresGit() {
    return false
  }

  initialize(callback) {
    logHeader('Building @mindhive/packages.....')
    const packages = PackageUtilities.getPackages()
    this.packagesToBuild = PackageUtilities.filterIncludedPackages(packages)
    this.additionalFiles = this.config.additionalFiles
    printIgnoredPackages(PackageUtilities.filterIgnoredPackages(packages), this.logger)
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

