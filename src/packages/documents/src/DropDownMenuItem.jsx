import React from 'react'
import { withStyles } from '@mindhive/styles'
import compose from 'recompose/compose'

import MenuItem from 'material-ui/MenuItem'
import withProps from 'recompose/withProps'

const DropDownMenuItem = ({
  primaryText,
  _leftIcon,
  onTouchTap,
  disabled,
  textStyle,
}) =>
  <MenuItem
    primaryText={primaryText}
    leftIcon={_leftIcon}
    onTouchTap={onTouchTap}
    disabled={disabled}
    style={textStyle}
  />

const mapThemeToStyles = ({
  docDropDownMenu,
}) => ({
  disabled: {
    color: docDropDownMenu.disabledColor,
  },
  enabled: {
    color: docDropDownMenu.iconColor,
  },
})

const buildStyle = (disabled, style, styleOverride = {}) => disabled
  ? Object.assign({}, style.disabled, styleOverride.disabled)
  : Object.assign({}, style.enabled, styleOverride.enabled)

export default compose(
  withStyles(mapThemeToStyles),
  withProps(({ disabled, leftIcon, styles, iconStyle, textStyle }) => ({
    _leftIcon: React.cloneElement(leftIcon, { style: buildStyle(disabled, styles, iconStyle) }),
    textStyle: buildStyle(disabled, styles, textStyle)
  })),
)(DropDownMenuItem)

