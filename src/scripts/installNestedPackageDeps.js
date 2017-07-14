/* eslint global-require: 0 */
/* eslint-disable import/no-dynamic-require, no-console */
import {
  log,
  exec,
} from './build/utils'

import getSrcPackages from './build/packageUtils'

getSrcPackages().forEach((mhPackage) => {
  log(`yarn install in ${mhPackage}`)
  exec(`cd ${mhPackage.sourceDir} && yarn`, { async: true })
})
