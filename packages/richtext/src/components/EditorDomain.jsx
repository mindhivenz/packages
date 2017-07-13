import { action, observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js'

const emptyEditorState = EditorState.createEmpty()

class EditorDomain {

  _userOnChange = () => {}
  _userOnBlur = () => {}
  _userOnFocus = () => {}

  editor

  initialInputValue = undefined
  initialEditorState = undefined
  @observable.ref _editorState
  @observable _focused = false
  @observable errorText = undefined
  labelText

  constructor({ value, labelText, onChange, onBlur, onFocus }) {
    this.labelText = labelText
    // console.log(`Constructor: ${labelText} value:`, value)
    this.initialInputValue = value
    this._userOnChange = onChange
    this._userOnBlur = onBlur
    this._userOnFocus = onFocus

    this.initialEditorState = this.initialInputValue ?
      EditorState.createWithContent(convertFromRaw(JSON.parse(this.initialInputValue))) :
      emptyEditorState
    this._setEditorState(this.initialEditorState)
  }

  @action
  update({ errorText }) {
    this.errorText = errorText
  }

  @action
  _setEditorState = (editorState) => {
    this._editorState = editorState
  }

  @computed get editorState() {
    // console.log( 'editorState', this._editorState )
    return this._editorState || emptyEditorState
  }

  @computed get hasText() {
    // console.log('hasText', this.editorState)
    return this.editorState.getCurrentContent().hasText()
  }

  @computed get isFocused() {
    // console.log('hasText', this.editorState)
    return this._focused
  }

  @computed get hasError() {
    // console.log('hasText', this.editorState)
    return this.errorText
  }

  @computed get shrinkLabel() {
    return this.isFocused || this.hasText
  }

  handleEditorStateChange = (newEditorState) => {
    // console.log(`State Change!!: ${this.labelText}:`, newEditorState)

    const newContent = newEditorState.getCurrentContent()
    const newRawContent = convertToRaw(newContent)
    /*
      The following is to work out if the content has actually changed.
      // TODO remove when caps stored as JSON. Have a default empty state for
     */
    if (this.initialInputValue) {
      const isEqual = convertToRaw(this.initialEditorState.getCurrentContent()) === newRawContent
      if (! isEqual) {
        this._userOnChange(JSON.stringify(newRawContent))
      }
    } else if (newContent.hasText()) {
      this._userOnChange(JSON.stringify(newRawContent))
    } else {
      this._userOnChange(this.initialInputValue)
    }
    this._setEditorState(newEditorState)
  }

  toggleStyle = (style) => {
    this.handleEditorStateChange(RichUtils.toggleInlineStyle(
      this.editorState,
      style
    ))
  }

  @action
  _setFocus = (focused) => {
    // console.log('FOCUS', focused)
    this._focused = focused
  }

  _handleOnBlur = () => {
    this._userOnBlur()
    this._setFocus(false)
  }

  _handleOnFocus = () => {
    this._userOnFocus()
    this._setFocus(true)
  }

  focus = () => {
    this.editor.focus()
  }

  registerNode = (node) => {
    if (! this.editor) this.editor = node
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.editorState, command)
    if (newState) {
      this.handleEditorStateChange(newState)
      return true
    }
    return false
  }

}


export default EditorDomain
