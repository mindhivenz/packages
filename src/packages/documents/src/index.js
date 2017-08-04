import { version as VERSION } from '../package.json'

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
import withDocEditContextAsProps from './withDocEditContextAsProps'

module.exports = {
  DocAddFab,
  DocContainer,
  NoDocsLabel,
  DocList,
  DocListIcon,
  DocEdit,
  DocView,
  DocStatefulIcon,
  DocDropDownMenu,
  withDocEditContextAsProps,
  withDocEditContext,
  getVersion: () => VERSION,
}

