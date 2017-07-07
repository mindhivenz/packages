
import { version as VERSION } from '../package.json'

import applyTheme from './applyTheme'
import withStyles from './withStyles'
import withClassNames from './withClassNames'

module.exports = {
  applyTheme,
  withStyles,
  withClassNames,
  getVersion: () => VERSION,
}

