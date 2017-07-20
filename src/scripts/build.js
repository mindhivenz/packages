import cleanDestination from './lib/clean'
import compileSources from './lib/compileSources'
import copyAdditionalFiles from './lib/copyAdditionalFiles'

import PackageUtilities from './package/PackageUtilities'

import { printIgnoredPackages } from './lib/packageUtils'

import {
  logBr,
  newGroup,
  logError,
  logHeader,
} from './utils/CliUtils'

const logger = newGroup('build.js')

try {

  logHeader('Building @mindhive/packages.....')
  const packages = PackageUtilities.getPackages()
  const includedPackages = PackageUtilities.filterIncludedPackages(packages)
  const tracker = logger.newItem('buildPackages')
  tracker.addWork(includedPackages.length * 3)

  printIgnoredPackages()
  logBr()

  PackageUtilities.runParallel(includedPackages, packageToBuild => (cb) => {
    try {
      tracker.info(packageToBuild.name, 'Building package......')
      cleanDestination(packageToBuild, tracker)
      copyAdditionalFiles(packageToBuild, tracker)
      compileSources(packageToBuild, tracker, () => {
        tracker.info(packageToBuild.name, 'DONE!!')
      })

    } catch (err) {
      tracker.error(packageToBuild.name, err)
      cb(err)
    }
  }, 4, () => {
  })
  tracker.finish()


} catch (error) {
  logError('Release failed due to an error', error)
}
