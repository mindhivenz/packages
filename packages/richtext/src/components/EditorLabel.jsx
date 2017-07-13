import React from 'react'
import compose from 'recompose/compose'

import { injectLabelStyles } from './EditorStyles'


const EditorLabel = ({
  className,
  children,
  htmlFor,
  styles,
  prepareStyles,
}) =>
  <label
    className={className}
    style={prepareStyles(styles.root)}
    htmlFor={htmlFor}
  >
    {children}
  </label>


export default compose(
  injectLabelStyles,
)(EditorLabel)
