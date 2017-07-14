import cleanDestination from './build/clean'
import compileSources from './build/compileSources'
import copyAdditionalFiles from './build/copyAdditionalFiles'

import getSrcPackages from './build/packageUtils'

import {
  logBr,
  logSuccess,
  logError,
  logTitle,
  logPackage,
} from './build/utils'

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
