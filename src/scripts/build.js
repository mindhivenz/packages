import cleanDestination from './lib/clean'
import compileSources from './lib/compileSources'
import copyAdditionalFiles from './lib/copyAdditionalFiles'

import getSrcPackages from './lib/packageUtils'

import {
  logBr,
  logSuccess,
  logError,
  logTitle,
  logPackage,
} from './lib/utils'

const buildPackage = (mhPackage) => {
  logBr()
  logPackage(mhPackage.npmName)

  cleanDestination(mhPackage)
  compileSources(mhPackage)
  copyAdditionalFiles(mhPackage)

  logSuccess('Done!')
  logBr()
}

try {
  logBr()
  logTitle('                                            ')
  logTitle('        Building @mindhive/packages.        ')
  logTitle('                                            ')
  logBr()
  getSrcPackages().forEach(buildPackage)
} catch (error) {
  logError('Release failed due to an error', error)
}
