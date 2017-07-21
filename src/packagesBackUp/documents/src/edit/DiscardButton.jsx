import React from 'react'
import FlatButton from 'material-ui/FlatButton'

import { injectStylesSheet } from './EditStyles'

const SearchIcon = ({
  onTouchTap,
  styles,
}) =>
  <FlatButton
    label="Discard"
    style={styles.discard}
    onTouchTap={onTouchTap}
  />

export default injectStylesSheet(SearchIcon)
