import { version as VERSION } from '../package.json' // eslint-disable-line import/no-unresolved
import TextEditor from './reduxForm/TextEditor'
import TextView from './TextView'

module.exports = {
  TextEditor,
  TextView,
  getVersion: () => VERSION,

}

