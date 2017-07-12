import React from 'react'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import UnderlineIcon from 'material-ui/svg-icons/editor/format-underlined'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import { withStyles } from '@mindhive/styles'
import StyleButton from './StyleButton'

const EditorCommands = ({
  styles,
  prepareStyles,
  toggleStyle,
  editorState,
  focused,
}) =>
  <div style={prepareStyles(styles.buttons)}>
    <StyleButton
      editorState={editorState}
      toggleStyle={toggleStyle}
      focused={focused}
      inlineStyle={'BOLD'}
      tabIndex={-1}
    >
      <BoldIcon />
    </StyleButton>
    <StyleButton
      editorState={editorState}
      toggleStyle={toggleStyle}
      focused={focused}
      inlineStyle={'ITALIC'}
      tabIndex={-1}
    >
      <ItalicIcon />
    </StyleButton>
    <StyleButton
      editorState={editorState}
      toggleStyle={toggleStyle}
      focused={focused}
      inlineStyle={'UNDERLINE'}
      tabIndex={-1}
    >
      <UnderlineIcon />
    </StyleButton>
  </div>

const mapThemeToStyles = ({
  textField: {
    hintColor,
    focusColor,
  },
}) => ({
  focusColor,
  hintColor,
  buttons: {
    display: 'inline-block',
    float: 'right',
  },
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

export default withStyles(mapThemeToStyles)(EditorCommands)
