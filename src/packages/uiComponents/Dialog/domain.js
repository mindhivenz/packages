// @flow

import { observable, action, computed } from 'mobx'
import keycode from 'keycode'

export class DialogDomain {

  @observable _wantOpen = false

  constructor() {
  }

  @computed get isOpen():boolean {
    return this._wantOpen
  }

  @action open() {
    this._wantOpen = true
  }

  @action close() {
    this._wantOpen = false
  }

  handleKeyUp = (event: {}) => {
    const key = keycode(event)
    if (key === 'esc') {
      this.close()
    } else if (key === 'enter' && this.primaryButton) {
      this.close()
    }
  }

}

export default (context: {}) => ({
  dialogDomain: new DialogDomain(),
})