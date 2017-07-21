import React from 'react'
import compose from 'recompose/compose'

const EditorLabel = ({
  className,
  children,
  htmlFor,
}) =>
  <label
    className={className}
    htmlFor={htmlFor}
  >
    {children}
  </label>


export default compose(
)(EditorLabel)
