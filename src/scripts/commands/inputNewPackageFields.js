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

const questions = ({ packageScope, packageName, author, description, keywords }) => ([
  {
    type: 'input',
    name: 'packageScope',
    message: 'Package scope',
    default: packageScope || '@mindhive',
    validate: validateScope,
  },
  {
    type: 'input',
    name: 'packageName',
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
    default: description,
  },
  {
    type: 'input',
    name: 'keywords',
    message: 'Keywords (aaa, bbb, ccc .....)',
    default: keywords,
  },
])

async function getUserInput(defaults) {
  return PromptUtilities.questions(questions(Object.assign({}, { author: await fullname() }, defaults)))
}


export default data => getUserInput(data)

