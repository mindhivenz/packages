import React from 'react'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import UnderlineIcon from 'material-ui/svg-icons/editor/format-underlined'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import compose from 'recompose/compose'

import StyleButton from './StyleButton'

const EditorCommands = ({
  toggleStyle,
  editorState,
  focused,

  classes,
}) =>
  <div className={classes}>
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


export default compose(
)(EditorCommands)

