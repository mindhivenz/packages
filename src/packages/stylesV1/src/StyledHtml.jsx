import React from 'react'

import withStyles from './withStyles'

const StyledHtml = ({
  rawHtml,
  style,

  prepareStyles,
}) =>
  <div
    style={prepareStyles(style)}
    dangerouslySetInnerHTML={{ __html: rawHtml }}  // eslint-disable-line react/no-danger
  />


export default withStyles()(StyledHtml)

