import { action, observable, computed } from 'mobx'

class EditDomain {

  animationOut = 100
  onCancel = () => {}
  lastFocusId = 'DOC_EDIT_LAST_FOCUS'
  firstFocusId = 'DOC_EDIT_FIRST_FOCUS'

  @observable _wantShow = false
  handleSubmit
  fields


  constructor(items = [], retrievers) {
    this.items = items
    this.retrievers = retrievers
  }

  @computed get show() {
    return this._wantShow
  }

  @action setShow(show) {
    this._wantShow = show
  }

  @action update({ onCancel, handleSubmit, fields }) {
    this.handleSubmit = handleSubmit
    this.fields = fields
    // console.log('SubMenu.update', menuItems)
    this.onCancel = onCancel
    // console.log('after update', this.menuItems)
  }

  @action handleClose = (callback) => {
    this.setShow(false)
    this.leaveTimeout = setTimeout(() => {
      this.leaveTimeout = null
      callback()
    }, this.animationOut) // matches transition duration
  }

  handleOpen() {
    this.setShow(true)
  }

  discardChanges = () => {
    this.handleClose(this.onCancel)
  }

  submitChanges = (e) => {
    e.preventDefault()
    this.handleSubmit(this.fields)
  }

  registerFirstFocus = (node) => {
    if (this.firstFocusable === undefined) {
      this.firstFocusable = node
    }
  }

  focusForward = (e) => {
    if (e.target.id === this.lastFocusId) {
      e.preventDefault()
      this.firstFocusable.getRenderedComponent().refs.component.input.focus()
    }
  }

  keyMap = {
    'focusForward': 'tab',
    'submitChanges': ['command+enter', 'ctrl+enter'],
    'discardChanges': 'esc',
  }

  handlers = {
    'focusForward': this.focusForward,
    'submitChanges': this.submitChanges,
    'discardChanges': this.discardChanges,
    'enter': () => {},
  }

}

export default EditDomain
