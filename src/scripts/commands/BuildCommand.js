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
// import FileSystemUtilities from '../utils/FileSystemUtilities'
// import PromptUtilities from '../utils/PromptUtilities'

// export const command = 'build'
// export const describe = 'Remove the trans-piled code from all packages.'

export default class BuildCommand extends Command {
  get requiresGit() {
    return false
  }

  initialize(callback) {
    logHeader('Building @mindhive/packages.....')
    const packages = PackageUtilities.getPackages()
    const includedPackages = PackageUtilities.filterIncludedPackages(packages)
    const ignoredPackages = PackageUtilities.filterIgnoredPackages(packages)
    const tracker = newTracker('buildPackages')
    tracker.addWork(includedPackages.length * 3)

    printIgnoredPackages(ignoredPackages)
    logBr()

    callback(null, true)

  }

  execute(callback) {
    const tracker = this.logger.newItem('clean')
    tracker.addWork(this.directoriesToDelete.length)

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

