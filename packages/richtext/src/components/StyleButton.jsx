import React from 'react'
import IconButton from 'material-ui/IconButton'
import compose from 'recompose/compose'
import { injectButtonStyles } from './EditorStyles'

const preventDefault = event => event.preventDefault()

const wrapPrevent = callback =>
  (event) => {
    event.preventDefault()
    callback()
  }


const StyleButton = ({
  toggleStyle,
  inlineStyle,
  children,

  styles,
  theme,
  prepareStyles,

  editorState: omitEditorState,
  focused: omitFocused,

  ...other,
}) =>
  <IconButton
    iconStyle={styles.icon}
    style={styles.button}
    onTouchTap={wrapPrevent(() => toggleStyle(inlineStyle))}
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
)(StyleButton)
