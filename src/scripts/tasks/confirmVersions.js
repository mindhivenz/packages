
import { logBr, logSuccess, styleWhiteBold, styleError } from '../utils/CliUtils'
import PromptUtilities from '../utils/PromptUtilities'

export default async (packages, versions, logger) => {

  logBr()
  logSuccess('Changes:')
  packages.forEach((pkg) => {
    logger.info(`${pkg.npmName}:`, `${pkg.version} => ${styleWhiteBold(versions[pkg.npmName])} ${pkg.isPrivate() ? styleError('private') : ''}`)
  })
  logBr()

  const confirm = await PromptUtilities.confirm('Are you sure you want to publish the above changes?')
  logBr()
  return confirm

}

