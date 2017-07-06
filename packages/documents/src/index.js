import { version as VERSION } from '../package.json'

import DocContainer from './DocContainer'
import NoDocsLabel from './NoDocsLabel'
import DocList from './DocList'
import DocListIcon from './DocListIcon'
import DocEdit from './DocEdit'
import DocView from './DocView'

module.exports = {
  DocContainer,
  NoDocsLabel,
  DocList,
  DocListIcon,
  DocEdit,
  DocView,
  getVersion: () => VERSION,
}

