import asyncNpm from 'async'

import cleanDestination from './lib/clean'
import compileSources from './lib/compileSources'
import copyAdditionalFiles from './lib/copyAdditionalFiles'

import PackageUtilities from './package/PackageUtilities'

import getSrcPackages, { printIgnoredPackages } from './lib/packageUtils'

import {
  logBr,
  newGroup,
  logSuccess,
  logError,
  // logTitle,
  logPackage,
  logPackageTitle,
  logHeader,
} from './utils/CliUtils'

const logger = newGroup('build.js')

const buildPackage = async (packageT0build, tracker) => {
  const { name, scope } = packageT0build.scopedName
  logBr()
  tracker.info(packageT0build.name, 'Building package......', )
  // logPackageTitle(scope, name)
  cleanDestination(packageT0build, tracker)
  compileSources(packageT0build, tracker)
  copyAdditionalFiles(packageT0build, tracker)

  // logSuccess('Done!')
  // logBr()
}

try {

  logHeader('Building @mindhive/packages.....')
  const packages = PackageUtilities.getPackages()
  // console.log('===========================================')
  // console.log(packages)
  // const ignoredPackages = PackageUtilities.filterIgnoredPackages(packages)
  const includedPackages = PackageUtilities.filterIncludedPackages(packages)
  // console.log('===========================================')
  // console.log(includedPackages)

  const tracker = logger.newItem('buildPackages')
  tracker.addWork(includedPackages.length * 3)

  printIgnoredPackages()
  logBr()

  PackageUtilities.runParallelBatches([includedPackages], packageTobuild => (cb) => {
    try {
      // const { name, scope } = packageTobuild.scopedName
      tracker.info(packageTobuild.name, 'Building package......')
      // logPackageTitle(scope, name)
      cleanDestination(packageTobuild, tracker)
      compileSources(packageTobuild, tracker)
      copyAdditionalFiles(packageTobuild, tracker)
    } catch (err) {
      cb(err)
    }
  }, 4, (err) => {
    if (err) logError(err)
    tracker.info(name, 'DONE!!')
    tracker.finish()
  })

  // asyncNpm.parallel(includedPackages.map(packageToBuild =>
  //     async (callback) => {
  //       await buildPackage(packageToBuild, tracker)
  //       callback(null, `${packageToBuild.name} DONE!`)
  //     }
  //   ),
  //   () => {
  //     logBr()
  //     // logSuccess('Done!')
  //   }
  // )

} catch (error) {
  logError('Release failed due to an error', error)
}
