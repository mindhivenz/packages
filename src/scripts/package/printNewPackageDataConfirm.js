import { log } from '../utils/CliUtils'

export default ({ name, version, author, description }, logger) => {
  log('About to create package:')
  logger.info('        Name', name)
  logger.info('     Version', version)
  logger.info('      Author', author)
  logger.info(' Description', description)
}
