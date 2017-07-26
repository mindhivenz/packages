import {
  logBr,
  log,
  styleWhiteBold,
  styleError,
  styleDisabled,
} from '../utils/CliUtils'
import PackageUtilities from './PackageUtilities'

export const printPackageVersions = (
  { updating, skipping },
  versions,
  logger
) => {
  if (updating) {
    logBr()
    logger.info(styleWhiteBold('Updating:'))
    updating.forEach(pkg => {
      const { npmName, version: currentVersion } = pkg
      const newVersion = versions[npmName]
      logger.info(
        `${npmName}:`,
        `${currentVersion} => ${styleWhiteBold(newVersion)} ${pkg.isPrivate()
          ? styleError('private')
          : ''}`
      )
    })
  }
  if (skipping) {
    logBr()
    log('Skipping:')
    skipping.forEach(pkg => {
      logger.info(styleDisabled(pkg.npmName))
    })
  }
  logBr()
}

export default (allPackages, versions, logger) => {
  printPackageVersions(
    PackageUtilities.filterSkippedPackages(allPackages, versions),
    versions,
    logger
  )
}
