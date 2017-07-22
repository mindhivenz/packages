import { logBr, logError, log, logSuccess } from '../utils/CliUtils'
import PackageUtilities from '../package/PackageUtilities'
import Errors from '../package/Errors'

// import PromptUtilities from '../utils/PromptUtilities'

export default (allPackages, name, logger) => {
  let packages
  try {
    packages = PackageUtilities.filterPackagesByName(allPackages, name)
    logger.info('Building one package:', name)
  } catch (err) {
    logger(err)
    if (err.is(Errors.PackageNotFoundError)) {
      logBr()
      logSuccess('Available packages')
      allPackages.forEach(pkg => log(' + ', pkg.npmName))
    }
    logBr()
    return null
  }
  return packages
}

