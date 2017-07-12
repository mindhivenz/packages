import React from 'react'
import IconButton from 'material-ui/IconButton'
import { withStyles } from '@mindhive/styles'

const preventDefault = (event) => event.preventDefault();

const wrapPrevent = (callback) =>
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


const mapThemeToStyles = ({
  palette,
  textField: {
    focusColor,
  },
}, {
  focused,
  editorState,
  inlineStyle,
}) => ({
  color: focused && editorState.getCurrentInlineStyle().has(inlineStyle) ? focusColor : palette.textColor,
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    width: 24,
    height: 24,
    padding: 2,
  },
})


export default withStyles(mapThemeToStyles)(StyleButton)
