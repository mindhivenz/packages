import fsUtils from '../utils/FileSystemUtilities'
import { getSourceDir } from '../package/packageUtils'
import createNewPackageJson from './createNewPackageJson'
import { logBr } from '../utils/CliUtils'
import AsyncTask from '../core/AsyncTask'

export default class CreatePackageTask extends AsyncTask {

  execute(packageData) {
    const { packageName, name } = packageData
    const newPackageDir = getSourceDir(packageName)
    logBr()
    this.logger.info('Creating package', name)
    this.logger.info('     At location', newPackageDir)
    logBr()

    fsUtils.copySync(this.config.basePackageSource, newPackageDir)
    createNewPackageJson(newPackageDir, packageData)
    return true
  }

}
