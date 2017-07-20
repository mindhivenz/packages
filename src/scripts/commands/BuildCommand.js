import cleanDestination from '../lib/clean'
import compileSources from '../lib/compileSources'
import copyAdditionalFiles from '../lib/copyAdditionalFiles'
import { printIgnoredPackages } from '../package/packageUtils'

import {
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
        copyAdditionalFiles(packageToBuild, tracker)
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

