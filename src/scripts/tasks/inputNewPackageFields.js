import npmSafeName from 'npm-safe-name'
import fullname from 'fullname'
import semver from 'semver'
import { packageFullName, packageDirExists } from '../package/packageUtils'
import PromptUtilities from '../utils/PromptUtilities'
import { logBr } from '../utils/CliUtils'

const someSafeNpmName = 'valid-name'

const validateScope = scope => npmSafeName(someSafeNpmName, scope) !== null || 'Please enter a valid scope'

const validateDirNotExist = name => ! packageDirExists(name) || 'Package directory already exists'
const validateNmpName = name => (name && npmSafeName(name) !== null) || 'Please enter a valid name'

const validateName = (name) => {
  const valid = validateNmpName(name)
  if (typeof valid === 'string') return valid
  return validateDirNotExist(name)
}

const validateVersion = v => v !== null || 'Must be a valid semver version'
const questions = ({ packageScope, packageName, version, author, description }) => ([
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
    name: 'version',
    message: 'Version',
    filter: semver.valid,
    validate: validateVersion,
    default: version || '0.0.0',
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
  // {
  //   type: 'input',
  //   name: 'keywords',
  //   message: 'Keywords (aaa, bbb, ccc .....)',
  //   default: keywords,
  // },
])

export default async (defaults) => {
  logBr()
  const questionDefaults = Object.assign({}, { author: await fullname() }, defaults)
  const packageData = await PromptUtilities.questions(questions(questionDefaults))
  packageData.name = packageFullName(packageData.packageScope, packageData.packageName)
  return packageData
}
