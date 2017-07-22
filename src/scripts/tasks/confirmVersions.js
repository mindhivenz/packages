
import { logBr, logSuccess, styleWhiteBold, styleError } from '../utils/CliUtils'
import PromptUtilities from '../utils/PromptUtilities'

export default async (packages, versions, logger) => {

  logBr()
  logSuccess('Changes:')
  packages.forEach((pkg) => {
    const { npmName, version } = pkg
    const newVersion = versions[npmName]
    if (newVersion === 'SKIP') {
      logger.info(`${npmName}:`, styleError('Skipped!'))
    } else {
      logger.info(
        `${npmName}:`,
        `${version} => ${styleWhiteBold(newVersion)} ${pkg.isPrivate() ? styleError('private') : ''}`
      )
    }
  })
  logBr()

  const confirm = await PromptUtilities.confirm('Are you sure you want to publish the above changes?')
  logBr()
  return confirm

}

