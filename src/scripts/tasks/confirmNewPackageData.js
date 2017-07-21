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
  const confirm = await PromptUtilities.confirm(
    'Do you want to continue?', [
      { key: 'y', name: 'Yes', value: true },
      { key: 'n', name: 'No, enter data again', value: false },
      { key: 'q', name: 'Quit', value: 'quit' },
    ]
  )
  logBr()
  return confirm
}

