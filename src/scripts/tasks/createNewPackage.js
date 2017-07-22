import fsUtils from '../utils/FileSystemUtilities'
import { getSourceDir } from '../package/packageUtils'
import createNewPackageJson from './createNewPackageJson'
import { logBr } from '../utils/CliUtils'

export default async (basePackage, packageData, logger) => {
  const { packageName, name } = packageData
  const newPackageDir = getSourceDir(packageName)
  logBr()
  logger.info('Creating package', name)
  logger.info('     At location', newPackageDir)
  logBr()

  fsUtils.copySync(basePackage, newPackageDir)
  createNewPackageJson(newPackageDir, packageData)
  return true
}

