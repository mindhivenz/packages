import React from 'react'
import { Provider } from 'react-redux'    // eslint-disable-line import/no-unresolved

import compose from 'recompose/compose'
import {injectStore} from './ReduxStoreModule'

const RxProvider = ({ store, children }) =>
  <Provider store={store}>
    {children}
  </Provider>

export default compose(
  injectStore(storeModule => ({
    store: storeModule.createStore()
  })),
)(RxProvider)