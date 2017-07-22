import { logBr, log } from '../utils/CliUtils'
import PromptUtilities from '../utils/PromptUtilities'

export default async ({ name, version, author, description }, logger) => {
  logBr()
  log('About to create package:')
  logger.info('        Name', name)
  logger.info('     Version', version)
  logger.info('      Author', author)
  logger.info(' Description', description)
  logBr()
  const confirm = await PromptUtilities.confirmRedo('Do you want to continue?')
  logBr()
  return confirm
}

