
import { logBr, log, logSuccess, styleWhiteBold, styleError, styleDisabled } from '../utils/CliUtils'
import PromptUtilities from '../utils/PromptUtilities'

export default async (packages, versions, logger) => {

  const skipped = []
  logBr()
  logSuccess('Changes:')
  packages.forEach((pkg) => {
    const { npmName, version } = pkg
    const newVersion = versions[npmName]
    if (newVersion === 'SKIP') {
      skipped.push(pkg)
    } else {
      logger.info(
        `${npmName}:`,
        `${version} => ${styleWhiteBold(newVersion)} ${pkg.isPrivate() ? styleError('private') : ''}`
      )
    }
  })
  if (skipped.length) {
    logBr()
    log('Skipping:')
    skipped.forEach((pkg) => {
      logger.info(styleDisabled(pkg.npmName))
    })
  }
  logBr()

  const confirm = await PromptUtilities.confirmRedo('Are you sure you want to publish the above changes?')
  logBr()
  return confirm

}

