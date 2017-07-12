import { action, observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js'

@observer
class EditorDomain {

  _onChange = () => {}
  _onBlur = () => {}
  _onFocus = () => {}

  editor

  initialInputValue
  initialEditorState
  @observable editorState
  @observable focused = false


  constructor({ value, onChange, onBlur, onFocus }) {
    this.initialInputValue = value
    this._onChange = onChange
    this._onBlur = onBlur
    this._onFocus = onFocus

    this.initialEditorState = this.initialInputValue ?
      EditorState.createWithContent(convertFromRaw(JSON.parse(this.initialInputValue))) :
      EditorState.createEmpty()
    this.init()
  }

  @action
  init = () => {
    this.editorState = this.initialEditorState
    this.focused = false
  }

  onChange = (editorState) => {
    const currentContent = editorState.getCurrentContent()
    /*
      The following is to work out if the content has actually changed.
      // TODO remove when caps stored as JSON. Have a default empty state for
     */
    if (this.initialInputValue) {
      const currentRawContent = convertToRaw(currentContent)
      const isEqual = convertToRaw(this.initialEditorState.getCurrentContent()) === currentRawContent
      if (! isEqual) {
        this._onChange(JSON.stringify(currentRawContent))
      }
    } else if (currentContent.hasText()) {
      this._onChange(JSON.stringify(convertToRaw(currentContent)))
    } else {
      this._onChange(this.initialInputValue)
    }
    this._setEditorState(editorState)
  }

  toggleStyle = (style) => {
    this.onChange(RichUtils.toggleInlineStyle(
      this.editorState,
      style
    ))
  }

  @action
  _setEditorState = (editorState) => {
    this.editorState = editorState
  }

  @action
  _setFocus = (focused) => {
    this.focused = focused
  }

  _handleOnBlur = () => {
    this._onBlur()
    this._setFocus(false)
  }

  _handleOnFocus = () => {
    this._onFocus()
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
      this.onChange(newState)
      return true
    }
    return false
  }

}


export default EditorDomain
