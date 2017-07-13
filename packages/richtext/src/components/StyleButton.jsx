import React from 'react'
import IconButton from 'material-ui/IconButton'
import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'
import { injectButtonStyles } from './EditorStyles'

const preventDefault = event => event.preventDefault()

const wrapPrevent = callback =>
  (event) => {
    event.preventDefault()
    callback()
  }


const StyleButton = ({
  styles,
  onTouchTap,
  children,
  ...other
}) =>
  <IconButton
    iconStyle={styles.icon}
    style={styles.button}
    onTouchTap={onTouchTap}
    onMouseDown={preventDefault}
    {...other}
  >
    {React.cloneElement(children, {
      color: styles.color,
      hoverColor: styles.focusColor,
    })}
  </IconButton>

export default compose(
  injectButtonStyles,
  mapProps(({
    toggleStyle,
    inlineStyle,
    children,
    styles,
    focused, // eslint-disable-line no-unused-vars
    theme, // eslint-disable-line no-unused-vars
    prepareStyles, // eslint-disable-line no-unused-vars
    ...other
  }) => ({
    styles,
    onTouchTap: wrapPrevent(() => toggleStyle(inlineStyle)),
    children,
    ...other,
  }))
)(StyleButton)
