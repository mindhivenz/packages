import npmSafeName from 'npm-safe-name'
import fullname from 'fullname'

import { packageDirExists } from '../lib/packageUtils'
import PromptUtilities from '../utils/PromptUtilities'

const someSafeNpmName = 'valid-name'

const validateScope = scope => npmSafeName(someSafeNpmName, scope) !== null || 'Please enter a valid scope'

const validateDirNotExist = name => ! packageDirExists(name) || 'Package directory already exists'
const validateNmpName = name => npmSafeName(name) !== null || 'Please enter a valid name'

const validateName = (name) => {
  const valid = validateNmpName(name)
  if (typeof valid === 'string') return valid
  return validateDirNotExist(name)
}
const questions = ({ author, packageName }) => ([
  {
    type: 'input',
    name: 'scope',
    message: 'Package scope',
    default: '@mindhive',
    validate: validateScope,
  },
  {
    type: 'input',
    name: 'name',
    message: 'Package name',
    default: packageName,
    validate: validateName,
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author',
    default: author,
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description',
  },
  {
    type: 'input',
    name: 'keywords',
    message: 'Keywords (aaa, bbb, ccc .....)',
  },
])

async function getUserInput(props) {
  return PromptUtilities.prompt(questions(Object.assign({}, props, { author: await fullname() })))
}


export default packageName => getUserInput({ packageName })

