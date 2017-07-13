import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'

import withStore from '@mindhive/mobx/withStore'
import { withClassNames } from '@mindhive/styles'

import { Editor } from 'draft-js'
import { injectEditorStyles, injectEditorClasses  } from './components/EditorStyles'


import EditorDomain from './components/EditorDomain'
import EditorUnderline from './components/EditorUnderline'
import EditorLabel from './components/EditorLabel'
import EditorError from './components/EditorError'
import EditorCommands from './components/EditorCommands'

const TextEditor = ({
  labelText,
  styles,
  classNames,

  prepareStyles,
  errorText,

  editorDomain,

  debug,
}) =>
  <div style={prepareStyles(styles.content, debug ? styles.debugContent : {})} onClick={editorDomain.focus}>
    <EditorLabel
      focused={editorDomain.focused}
      shrink={editorDomain.focused || editorDomain.hasText}
      errorText={errorText}
      debug={debug}
    >
      {labelText}
    </EditorLabel>
    <EditorCommands
      editorState={editorDomain.editorState}
      focused={editorDomain.focused}
      toggleStyle={editorDomain.toggleStyle}
      debug={debug}
    />
    <div className={classNames}>
      <Editor
        ref={editorDomain.registerNode}
        editorState={editorDomain.editorState}
        onChange={editorDomain.handleEditorStateChange}
        handleKeyCommand={editorDomain.handleKeyCommand}
        onFocus={editorDomain._handleOnFocus}
        onBlur={editorDomain._handleOnBlur}
      />
      <EditorUnderline focus={editorDomain.focused} errorText={errorText} />
      <EditorError errorText={errorText} />
    </div>

  </div>

export default compose(
  withStore({
    storeClass: EditorDomain,
    propName: 'editorDomain',
    mapPropsToArgs: _props => _props,
    shouldRecreateStore: () => false,
  }),
  injectEditorStyles,
  injectEditorClasses,
  withClassNames(({ editorDomain, editorClasses, debug }) => [
    editorClasses.editorWrapper,
    {
      'focused': editorDomain.focused,
      'debug': debug,
    },
  ]),
  observer,
)(TextEditor)
