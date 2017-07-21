import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import { injectStylesSheet } from './EditStyles'

const CloseButton = ({
  onTouchTap,
  styles,
}) =>
  <RaisedButton
    onTouchTap={onTouchTap}
    label="close"
    style={styles.close}
    secondary
  />

export default injectStylesSheet(CloseButton)
