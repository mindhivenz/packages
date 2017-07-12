import { version as VERSION } from '../package.json' // eslint-disable-line import/no-unresolved
import DraftEditor from './DraftEditor'
import DraftHtmlView from './DraftHtmlView'

module.exports = {
  DraftEditor,
  DraftHtmlView,
  getVersion: () => VERSION,

}

