import ConfirmRedoTask from './ConfirmRedoTask'
import { logBr, log, styleWhiteBold, styleError, styleDisabled } from '../utils/CliUtils'
import PackageUtilities from '../package/PackageUtilities'

export default class ConfirmVersionsTask extends ConfirmRedoTask {

  async execute(versions) {
    const { packages } = this.initialValues
    const { updating, skipping } = PackageUtilities.filterSkippedPackages(packages, versions)
    if (updating) {
      logBr()
      this.logger.info(styleWhiteBold('Updating:'))
      updating.forEach((pkg) => {
        const { npmName, version: currentVersion } = pkg
        const newVersion = versions[npmName]
        this.logger.info(
          `${npmName}:`,
          `${currentVersion} => ${styleWhiteBold(newVersion)} ${pkg.isPrivate() ? styleError('private') : ''}`
        )
      })
    }
    if (skipping) {
      logBr()
      log('Skipping:')
      skipping.forEach((pkg) => {
        this.logger.info(styleDisabled(pkg.npmName))
      })
    }
    logBr()
    return await super.execute()
  }

}
