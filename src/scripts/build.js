import asyncNpm from 'async'

import cleanDestination from './lib/clean'
import compileSources from './lib/compileSources'
import copyAdditionalFiles from './lib/copyAdditionalFiles'

import PackageUtilities from './package/PackageUtilities'

import getSrcPackages, { printIgnoredPackages } from './lib/packageUtils'

import {
  logBr,
  logSuccess,
  logError,
  // logTitle,
  logPackage,
  logPackageTitle,
  logHeader,
} from './utils/CliUtils'

const buildPackage = async (mhPackage) => {
  logBr()
  logPackageTitle(mhPackage.scope, mhPackage.name)
  cleanDestination(mhPackage)
  compileSources(mhPackage)
  copyAdditionalFiles(mhPackage)

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
  console.log(includedPackages)

  printIgnoredPackages()
  asyncNpm.parallel(getSrcPackages().map(mhPack =>
      async (callback) => {
        await buildPackage(mhPack)
        callback(null, `${mhPack.npmName} DONE!`)
      }
    ),
    () => {
      logBr()
      // logSuccess('Done!')
    }
  )

} catch (error) {
  logError('Release failed due to an error', error)
}
