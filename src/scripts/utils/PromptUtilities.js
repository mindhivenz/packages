import inquirer from 'inquirer'
import log from 'npmlog'
import { QUIT } from '../core/Codes'

async function _input(message, { filter, validate } = {}) {
  log.pause()
  const answers = await inquirer.prompt([{
    type: 'input',
    name: 'input',
    message,
    filter,
    validate,
  }])
  log.resume()
  return answers.input
}

const _select = async (message, choices) => {
  log.pause()
  const answers = await inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message,
    choices,
    pageSize: choices.length,
  }])
  log.resume()
  return answers.prompt
}

async function _prompt(questions) {
  log.pause()
  const answers = await inquirer.prompt(questions)
  log.resume()
  return answers
}

const CONFIRM_CHOICES = [
  { key: 'y', name: 'Yes', value: true },
  { key: 'n', name: 'No', value: false },
]

const DEFAULT_CONFIRM_MESSAGE = 'Do you want to continue?'

async function _confirm(message = DEFAULT_CONFIRM_MESSAGE, choices = CONFIRM_CHOICES) {
  const defaultChoice = choices.length + 1 // default to help in order to avoid clicking straight through
  const answers = await _prompt([{
    type: 'expand',
    name: 'confirm',
    message,
    default: defaultChoice,
    choices,
  }])
  return answers.confirm
}

const _confirmOrEdit = async (message) => {
  const answer = await _confirm(
    message, [
      { key: 'y', name: 'Yes', value: true },
      { key: 'n', name: 'No', value: false },
      { key: 'q', name: 'Quit', value: QUIT },
    ]
  )
  if (answer === QUIT) throw answer
  return answer
}


const _repeatUntilConfirm = async (input, processTask, confirmTask) => { // eslint-disable-line max-len
  let confirmed = false
  let data = input
  while (! confirmed) {
    data = await processTask.run(data)
    confirmed = await confirmTask.run(data)
  }
  return data
}

export default {
  questions: _prompt,
  confirm: _confirm,
  confirmOrEdit: _confirmOrEdit,
  processUntilConfirm: _repeatUntilConfirm,
  select: _select,
  input: _input,
  separator: () => new inquirer.Separator(),
}
