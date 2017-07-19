import inquirer from 'inquirer'
import log from 'npmlog'

class PromptUtilities {
  static confirm(message, callback) {
    log.pause()
    inquirer.prompt([{
      type: 'expand',
      name: 'confirm',
      message,
      default: 2, // default to help in order to avoid clicking straight through
      choices: [
        { key: 'y', name: 'Yes', value: true },
        { key: 'n', name: 'No', value: false },
      ],
    }]).then((answers) => {
      log.resume()
      callback(answers.confirm)
    })
  }

  static select(message, { choices, filter, validate } = {}, callback) {
    log.pause()
    inquirer.prompt([{
      type: 'list',
      name: 'prompt',
      message,
      choices,
      pageSize: choices.length,
      filter,
      validate,
    }]).then((answers) => {
      log.resume()
      callback(answers.prompt)
    })
  }

  static input(message, { filter, validate } = {}, callback) {
    log.pause()
    inquirer.prompt([{
      type: 'input',
      name: 'input',
      message,
      filter,
      validate,
    }]).then((answers) => {
      log.resume()
      callback(answers.input)
    })
  }

}


async function _prompt(questions) {
  log.pause()
  const answers = await inquirer.prompt(questions)
  log.resume()
  return answers
}

async function _confirm(message, quit = false) {
  const choices = [
    { key: 'y', name: 'Yes', value: true },
    { key: 'n', name: 'No', value: false },
  ]
  if (quit) {
    choices.push({ key: 'q', name: 'Quit', value: 'quit' })
  }
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

export default {
  questions: _prompt,
  confirm: _confirm,
}