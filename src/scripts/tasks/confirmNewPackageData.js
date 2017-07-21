import { logBr, log } from '../utils/CliUtils'
import PromptUtilities from '../utils/PromptUtilities'

export default async ({ name, version, author, description }, tracker) => {
  logBr()
  log('About to create package:')
  tracker.info('        Name', name)
  tracker.info('     Version', version)
  tracker.info('      Author', author)
  tracker.info(' Description', description)
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

