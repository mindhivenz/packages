import AsyncTask from './AsyncTask'
import PromptUtilities from '../utils/PromptUtilities'

const DEFAULT_PROMPT = 'Do you want to continue?'

export default class ConfirmRedoTask extends AsyncTask {
  confirmPrompt

  constructor(confirmPrompt = DEFAULT_PROMPT) {
    super()
    this.confirmPrompt = confirmPrompt
  }

  async execute() {
    return await PromptUtilities.confirmOrEdit(this.confirmPrompt)
  }

}
