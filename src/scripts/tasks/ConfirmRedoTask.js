import ProcessConfirmTask from '../core/ProcessConfirmTask'
import PromptUtilities from '../utils/PromptUtilities'


export default class ConfirmRedoTask extends ProcessConfirmTask {

  async execute() {
    return await PromptUtilities.confirmOrEdit('Do you want to continue?')
  }

}
