import AsyncTask from '../core/AsyncTask'
import PromptUtilities from '../utils/PromptUtilities'


export default class ConfirmRedoTask extends AsyncTask {

  async execute() {
    return await PromptUtilities.confirmOrEdit('Do you want to continue?')
  }

}
