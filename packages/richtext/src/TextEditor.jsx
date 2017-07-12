import React from 'react'
import { observer } from 'mobx-react'
import { compose, branch, renderNothing, mapProps, withProps } from 'recompose'
import withStore from '@mindhive/mobx/withStore'

import { Editor } from 'draft-js'
import { withStyles } from '@mindhive/styles'


import EditorDomain from './components/EditorDomain'
import EditorUnderline from './components/EditorUnderline'
import EditorLabel from './components/EditorLabel'
import EditorError from './components/EditorError'
import EditorCommands from './components/EditorCommands'

const TextEditor = ({
  labelText,
  styles,
  prepareStyles,
  errorText,

  editorDomain,
}) =>
  <div style={prepareStyles(styles.content)} onClick={editorDomain.focus}>
    <EditorLabel
      focused={editorDomain.focused}
      shrink={editorDomain.focused || editorDomain.content.hasText()}
      errorText={errorText}
    >
      {labelText}
    </EditorLabel>
    <EditorCommands
      editorState={editorDomain.editorState}
      focused={editorDomain.focused}
      toggleStyle={editorDomain.toggleStyle}
    />
    <div style={prepareStyles(styles.editor)}>
      <Editor
        ref={editorDomain.registerNode}
        editorState={editorDomain.editorState}
        onChange={editorDomain.onChange}
        handleKeyCommand={editorDomain.handleKeyCommand}
        onFocus={editorDomain._handleOnFocus}
        onBlur={editorDomain._handleOnBlur}
      />
      <EditorUnderline focus={editorDomain.focused} errorText={errorText} />
      <EditorError errorText={errorText} />
    </div>

  </div>

const mapThemeToStyles = ({
  spacing,
  typography,
  transitions,

  textField: {
    hintColor,
    focusColor,
    errorColor,
  },
}, {
  containerStyle = {},
  editorStyle = {},
}) => ({
  focusColor,
  hintColor,
  label: {
    display: 'inline-block',
    position: 'relative',
    top: -5,

    fontSize: 103,
  },
  content: {
    position: 'relative',
    cursor: 'initial',

    fontSize: 16,
    lineHeight: '24px',
    width: '100%',
    display: 'inline-block',

    paddingTop: spacing.desktopGutterLess,
    paddingBottom: spacing.desktopGutterMini,

    ...containerStyle,
  },
  editor: {
    position: 'relative',
    width: 'calc(100% - 75px)',
    display: 'inline-block',
    paddingTop: spacing.desktopGutterMini,
    fontWeight: typography.fontWeight300,
    fontSize: 14,
    ...editorStyle,

  },

})

export default compose(
  observer,
  withStore({
    storeClass: EditorDomain,
    propName: 'editorDomain',
  }),
  withStyles(mapThemeToStyles),
)(TextEditor)
