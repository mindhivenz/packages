import ConfirmRedoTask from './ConfirmRedoTask'

import { logBr, log } from '../utils/CliUtils'

export default class ConfirmPackageDataTask extends ConfirmRedoTask {

  async execute({ name, version, author, description }) {
    logBr()
    log('About to create package:')
    this.logger.info('        Name', name)
    this.logger.info('     Version', version)
    this.logger.info('      Author', author)
    this.logger.info(' Description', description)
    logBr()
    return await super.execute()
  }

}
