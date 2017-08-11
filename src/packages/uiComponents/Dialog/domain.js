// @flow

import { observable, action, computed } from 'mobx'
import keycode from 'keycode'
import { makeProps } from '../Buttons/propHelper'

export class DialogDomain {
  _resolve: () => mixed
  _reject: () => mixed

  @observable _openPromise = null
  @observable _title = 'Default dialog title'
  @observable message = 'Default dialog message'
  @observable modal = true

  @observable _primaryButton = undefined
  @observable _secondaryButton = undefined

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
  get primaryButton(): ?{} {
    return makeProps(
      {
        label: 'Yes',
        onTouchTap: this.doSuccess,
      },
      this._primaryButton
    )
  }

  @computed
  get secondaryButton(): ?{} {
    return makeProps(
      {
        label: 'No',
        onTouchTap: this.doCancel,
      },
      this._secondaryButton
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
    primaryButton,
    secondaryButton,
  }: {
    title?: string,
    message?: string,
    modal?: boolean,
    primaryButton?: {},
    secondaryButton?: {},
  }) {
    this.modal = modal
    this._primaryButton = primaryButton
    this._secondaryButton = secondaryButton
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
    this._primaryButton = undefined
    this._secondaryButton = undefined
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
