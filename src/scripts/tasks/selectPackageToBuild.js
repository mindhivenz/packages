import { logBr, logError, log, logSuccess } from '../utils/CliUtils'
import PackageUtilities from '../package/PackageUtilities'
import Errors from '../package/Errors'

// import PromptUtilities from '../utils/PromptUtilities'

export default (packages, specifiedPackage, logger) => {
  let packagesToBuild
  try {
    packagesToBuild = PackageUtilities.filterPackagesByName(packages, specifiedPackage)
    logger.info('Building one package:', specifiedPackage)
  } catch (err) {
    logError(err)
    if (err.is(Errors.PackageNotFoundError)) {
      logBr()
      logSuccess('Available packages')
      packages.forEach(pkg => log(' + ', pkg.npmName))
    }
    logBr()
    return null
  }
  return packagesToBuild
}

