/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
import {
  log,
  exec,
} from './utils/utils'

import getSrcPackages from './package/packageUtils'

getSrcPackages().forEach((mhPackage) => {
  log(`yarn install in ${mhPackage.npmName}`)
  exec(`cd ${mhPackage.sourceDir} && yarn`, { async: true })
})
