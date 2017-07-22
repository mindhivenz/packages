import AsyncTask from './AsyncTask'
import { logBr, log } from '../utils/CliUtils'
import PromptUtilities from '../utils/PromptUtilities'

export default class ConfirmNewPackageDataTask extends AsyncTask {

  initialize({ name, version, author, description }, resolve) {
    logBr()
    log('About to create package:')
    this.logger.info('        Name', name)
    this.logger.info('     Version', version)
    this.logger.info('      Author', author)
    this.logger.info(' Description', description)
    resolve()
  }

  async execute(data, resolve, reject) {
    logBr()
    resolve(await PromptUtilities.confirmRedo('Do you want to continue?').catch(reject))
  }

}
