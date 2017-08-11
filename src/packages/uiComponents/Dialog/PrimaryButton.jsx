// @flow
import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { injectStylesSheet } from './Styles'

const PrimaryButton = ({
  disabled,
  label,
  onTouchTap,
  children,
  ...props
}) =>
  <RaisedButton
    key="primaryButton"
    disabled={disabled}
    label={label}
    onTouchTap={onTouchTap}
    primary
    {...props}
  />

export default compose(
  observer,
)(PrimaryButton)
