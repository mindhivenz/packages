import React from 'react'

import { withStyles } from '@mindhive/styles'


const NoDocsLabel = ({ hideWhenEmpty, children, styles, prepareStyles }) =>
  ! hideWhenEmpty ? <div style={prepareStyles(styles.noDocuments)}>{children}</div> : null

const mapThemeToStyles = ({
  palette,
  typography,
  appBar,
  spacing,
}) => ({
  noDocuments: {
    color: palette.disabledColor,
    fontWeight: typography.fontWeightMedium,
    textAlign: 'center',
    padding: appBar.height,
    fontSize: spacing.desktopGutterMore,
  },
})

export default withStyles(mapThemeToStyles)(NoDocsLabel)
