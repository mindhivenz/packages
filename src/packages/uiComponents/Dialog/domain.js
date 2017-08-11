// @flow

import { observable, action, computed } from 'mobx'
import keycode from 'keycode'
import { makeProps } from '../Buttons/propHelper'

type OpenProps = {
  title?: string,
  message?: string,
  modal?: boolean,
  confirmButton?: {},
  rejectButton?: {},
}

export class DialogDomain {
  _resolve: () => mixed
  _reject: () => mixed

  @observable _openPromise = null
  @observable _title = 'Default dialog title'
  @observable message = 'Default dialog message'
  @observable modal = true

  @observable _confirmButton = undefined
  @observable _rejectButton = undefined

  constructor() {}

  @computed
  get isOpen(): boolean {
    return this._openPromise !== null
  }

  @computed
  get title(): string {
    return this._title || 'Confirm'
  }

  @computed
  get confirmButton(): ?{} {
    return makeProps(
      {
        label: 'Yes',
        onTouchTap: this.doSuccess,
      },
      this._confirmButton
    )
  }

  @computed
  get rejectButton(): ?{} {
    return makeProps(
      {
        label: 'Cancel',
        onTouchTap: this.doCancel,
      },
      this._rejectButton
    )
  }

  @action
  _handlePromise = (resolve: () => mixed, reject: () => mixed) => {
    this._resolve = resolve
    this._reject = reject
  }

  @action
  _handleCancel = () => {
    this.close()
    this._reject()
    this._tidyUp()
  }

  @action
  _handleSuccess = () => {
    this.close()
    this._resolve()
    this._tidyUp()
  }

  @action doCancel = this._handleCancel
  @action doSuccess = this._handleSuccess

  @action
  open({
    title,
    message,
    modal = true,
    confirmButton,
    rejectButton,
  }: OpenProps) {
    this.modal = modal
    this._confirmButton = confirmButton
    this._rejectButton = rejectButton
    this._title = title
    this.message = message
    this._openPromise = new Promise(this._handlePromise)
    return this._openPromise
  }

  @action
  close() {
    this._openPromise = null
  }

  @action
  _tidyUp() {
    this._resolve = () => {}
    this._reject = () => {}
    this._confirmButton = undefined
    this._rejectButton = undefined
  }

  handleKeyUp = (event: {}) => {
    const key = keycode(event)
    if (key === 'esc') {
      this._handleCancel()
    } else if (key === 'enter') {
      this._handleSuccess()
    }
  }
}

export default (context: {}) => ({
  dialogDomain: new DialogDomain(),
})
