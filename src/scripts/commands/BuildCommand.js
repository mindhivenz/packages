import cleanDestination from '../tasks/clean'
import compileSources from '../tasks/compileSources'
import copyFiles from '../tasks/copyFiles'
import FindPackageByNameTask from '../tasks/FindPackageByNameTask'

import { printIgnoredPackages } from '../package/packageUtils'

import { QUIT, INIT, NOPAK } from '../core/Codes'

import {
  logBr,
  logHeader,
} from '../utils/CliUtils'

import PackageUtilities from '../package/PackageUtilities'

import Command from '../core/Command'

export default class BuildCommand extends Command {

  async initialize() {
    logHeader('Building @mindhive/packages.....')
    const specifiedPackage = this.input[0] || null
    this.filteredPackages = PackageUtilities.filterIncludedPackages(this.allPackages)
    printIgnoredPackages(PackageUtilities.filterIgnoredPackages(this.allPackages), this.logger)
    if (specifiedPackage) {
      const findPackageByNameTask = this.createTask(FindPackageByNameTask)
      this.filteredPackages = await findPackageByNameTask.run(specifiedPackage)
    }
    logBr()
  }


  execute() {
    const logger = this.logger
    const additionalFiles = this.config.additionalFiles
    logger.addWork(this.filteredPackages.length * 3)
    const concurrency = 4
    PackageUtilities.runParallel(this.filteredPackages, pkg => (cb) => {
      logger.package(pkg, 'Building package......')
      try {
        cleanDestination(pkg, logger)
        copyFiles(pkg, additionalFiles, logger)
        compileSources(pkg, logger, () => {
          logger.package(pkg, '...complete!')
          logger.completeWork(1)
          cb()
        })
      } catch (err) {
        logger.error(pkg.name, err)
        cb(err)
      }
    }, concurrency, (err) => {
      logBr()
      if (err) {
        throw err
      } else {
        logger.info('build', 'Completed successfully!')
      }
      logBr()
      logger.finish()
    })


  }

  handleError(code, err) {
    if (INIT === code && QUIT === err) {
      logBr()
      this.logger.warn('Quit without building!')
      logBr()
    } else {
      super.handleError(code, err)
    }
  }
}

export function handler(argv) {
  return new BuildCommand(argv._, argv).run()
}

