import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import { injectStylesSheet } from './EditStyles'

const SaveButton = ({
  docType,
  disabled,
  styles,
}) =>
  <RaisedButton
    id={`submit-${docType}-selector`}
    label="save"
    style={styles.save}
    disabledBackgroundColor={styles.save.disabledBackgroundColor}
    secondary
    type="submit"
    disabled={disabled}
  />


export default injectStylesSheet(SaveButton)
