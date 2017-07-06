import React from 'react'
import { ClearIcon } from '@mindhive/components/Icon'
import IconButton from 'material-ui/IconButton'

import { injectStylesSheet } from './EditStyles'

const CloseButton = ({
  onTouchTap,
  styles,
}) =>
  <IconButton
    onTouchTap={onTouchTap}
    style={styles.close.position}
  >
    <ClearIcon
      style={styles.close.position}
      color={styles.close.color}
      hoverColor={styles.close.hoverColor}
    />
  </IconButton>

export default injectStylesSheet(CloseButton)
