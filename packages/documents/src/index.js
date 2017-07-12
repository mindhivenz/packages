import { version as VERSION } from '../package.json'

import * as search from './search/index'

import DocAddFab from './DocAddFab'
import DocContainer from './DocContainer'
import NoDocsLabel from './NoDocsLabel'
import DocList from './DocList'
import DocListIcon from './DocListIcon'
import DocEdit from './DocEdit'
import DocView from './DocView'
import DocDropDownMenu from './DocDropDownMenu'
import DocStatefulIcon from './DocStatefulIcon'
import withDocEditContext from './withDocEditContext'

module.exports = {
  search,
  DocAddFab,
  DocContainer,
  NoDocsLabel,
  DocList,
  DocListIcon,
  DocEdit,
  DocView,
  DocStatefulIcon,
  DocDropDownMenu,
  withDocEditContext,
  getVersion: () => VERSION,
}

