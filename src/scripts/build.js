import cleanDestination from './lib/clean'
import compileSources from './lib/compileSources'
import copyAdditionalFiles from './lib/copyAdditionalFiles'

import PackageUtilities from './package/PackageUtilities'

import { printIgnoredPackages } from './lib/packageUtils'

import {
  logBr,
  newTracker,
  logError,
  logHeader,
} from './utils/CliUtils'


try {

  logHeader('Building @mindhive/packages.....')
  const packages = PackageUtilities.getPackages()
  const includedPackages = PackageUtilities.filterIncludedPackages(packages)
  const ignoreddPackages = PackageUtilities.filterIgnoredPackages(packages)
  const tracker = newTracker('buildPackages')
  tracker.addWork(includedPackages.length * 3)

  printIgnoredPackages(ignoreddPackages)
  logBr()


  PackageUtilities.runParallel(includedPackages, packageToBuild => (cb) => {
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
  }, 4, () => {
  })


} catch (error) {
  logError('Release failed due to an error', error)
}
