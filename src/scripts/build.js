import asyncNpm from 'async'

import cleanDestination from './lib/clean'
import compileSources from './lib/compileSources'
import copyAdditionalFiles from './lib/copyAdditionalFiles'

import getSrcPackages, { printIgnoredPackages } from './lib/packageUtils'

import {
  logBr,
  logSuccess,
  logError,
  // logTitle,
  logPackage,
  logHeader,
} from './lib/utils'

const buildPackage = async (mhPackage) => {
  logBr()
  logPackage(mhPackage.npmName)
  cleanDestination(mhPackage)
  compileSources(mhPackage)
  copyAdditionalFiles(mhPackage)

  // logSuccess('Done!')
  // logBr()
}

try {
  logHeader('Building @mindhive/packages.')
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
