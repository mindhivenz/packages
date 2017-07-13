import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'

import withStore from '@mindhive/mobx/withStore'

import { Editor as DraftEditor } from 'draft-js'
import { injectEditorClasses } from './components/EditorStyles'

import EditorDomain from './components/EditorDomain'
import EditorUnderline from './components/EditorUnderline'
import EditorLabel from './components/EditorLabel'
import EditorError from './components/EditorError'
import EditorCommands from './components/EditorCommands'

const TextEditor = ({
  labelText,
  classNames,

  errorText,

  editorDomain,
}) =>
  <div className={classNames.container} onClick={editorDomain.focus}>
    <EditorLabel
      errorText={errorText}
      className={classNames.editorLabel}
    >
      {labelText}
    </EditorLabel>
    <EditorCommands
      editorState={editorDomain.editorState}
      focused={editorDomain.isFocused}
      toggleStyle={editorDomain.toggleStyle}
      classes={classNames.commandsWrapper}
    />
    <div className={classNames.editorWrapper}>
      <DraftEditor
        ref={editorDomain.registerNode}
        editorState={editorDomain.editorState}
        onChange={editorDomain.handleEditorStateChange}
        handleKeyCommand={editorDomain.handleKeyCommand}
        onFocus={editorDomain._handleOnFocus}
        onBlur={editorDomain._handleOnBlur}
      />
      <EditorUnderline focus={editorDomain.isFocused} errorText={errorText} />
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
  // observer,
  injectEditorClasses,
)(TextEditor)
