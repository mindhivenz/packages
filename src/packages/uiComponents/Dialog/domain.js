// @flow

import { observable, action, computed } from 'mobx'

export class Domain {

  @observable _wantOpen = false

  @computed get open():boolean {
    return this._wantOpen
  }

}
