import inquirer from 'inquirer'
import log from 'npmlog'

export const QUIT = 'quit'

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

async function _select(message, choices) {
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

const _confirmRedo = message => new Promise(async (resolve, reject) => {
  const answer = await _confirm(
    message, [
      { key: 'y', name: 'Yes', value: true },
      { key: 'n', name: 'No, enter data again', value: false },
      { key: 'q', name: 'Quit', value: QUIT },
    ]
  )
  if (answer === QUIT) {
    reject(answer)
  } else {
    resolve(answer)
  }
})


const _repeatUntilConfirm = async (getData, printDataSummary, confirmMessage) => new Promise(async (resolve, reject) => { // eslint-disable-line max-len
  let proceed = false
  let data
  while (! proceed) {
    data = await getData()
    printDataSummary(data)
    proceed = await _confirmRedo(confirmMessage).catch(reject)
  }
  resolve(data)
})

export default {
  questions: _prompt,
  confirm: _confirm,
  confirmRedo: _confirmRedo,
  repeatUntilConfirm: _repeatUntilConfirm,
  select: _select,
  input: _input,
}
