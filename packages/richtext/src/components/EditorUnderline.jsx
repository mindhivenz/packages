import React from 'react'
import compose from 'recompose/compose'

import { injectUnderlineStyles } from './EditorStyles'

const EditorUnderline = ({
  prepareStyles,
  styles,
}) =>
  <div>
    <hr style={prepareStyles(styles.underline)} />
    <hr style={prepareStyles(styles.focusedUnderline)} />
  </div>

export default compose(
  injectUnderlineStyles,
)(EditorUnderline)
