import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { injectStylesSheet } from './SearchStyles'

const Spinner = ({
  styles,
}) =>
  <CircularProgress
    size={styles.spinnerSize}
    style={styles.spinner}
    color={styles.spinnerColor}
  />

export default injectStylesSheet(Spinner)
