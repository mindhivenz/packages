import { createStore, combineReducers } from 'redux'
import withModules from '../modules/withModules'

export const moduleName = 'reduxStoreModule'

export const injectStore = callback =>
  withModules(({ [moduleName]: module }) => callback(module))

const themeReducer = (state = { dark: true }, action) => {
  if (action.type === 'TOGGLE_THEME_SHADE') {
    return {
      ...state,
      dark: !state.dark,
    }
  }
  return state
}

class ReduxModule {
  reducers = {}
  middleware

  constructor() {
    if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
      this.middleware = window.devToolsExtension()
    }
  }

  registerReducer = reducer => {
    this.reducers = Object.assign({}, this.reducers, reducer)
  }

  createStore = () =>
    createStore(combineReducers(this.reducers), {}, this.middleware)
}
export default () => {
  const reduxStore = new ReduxModule()
  reduxStore.registerReducer({
    themeState: themeReducer,
  })
  return { [moduleName]: reduxStore }
}
