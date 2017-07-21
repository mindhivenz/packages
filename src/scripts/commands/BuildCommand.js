import cleanDestination from '../tasks/clean'
import compileSources from '../tasks/compileSources'
import copyFiles from '../tasks/copyFiles'
import { printIgnoredPackages } from '../package/packageUtils'

import {
  log,
  logBr,
  newTracker,
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
    printIgnoredPackages(PackageUtilities.filterIgnoredPackages(packages))
    logBr()
    callback(null, true)
  }


  execute(callback) {
    const tracker = newTracker('build')
    tracker.addWork(this.packagesToBuild.length)
    PackageUtilities.runParallel(this.packagesToBuild, packageToBuild => (cb) => {
      tracker.package(packageToBuild, 'Building package......')
      try {
        cleanDestination(packageToBuild, tracker)
        copyFiles(packageToBuild, this.additionalFiles, tracker)
        compileSources(packageToBuild, tracker, () => {
          tracker.package(packageToBuild, 'DONE!!')
          tracker.finish()
        })
      } catch (err) {
        tracker.error(packageToBuild.name, err)
        cb(err)
      }
    }, this.concurrency, (err) => {
      tracker.finish()

      if (err) {
        callback(err)
      } else {
        this.logger.success('build', 'finished')
        callback(null, true)
      }
    })


  }
}

export function handler(argv) {
  return new BuildCommand(argv._, argv).run()
}

