export default componentsProvider => ({reduxStoreModule}) => {
  if (componentsProvider.reduxReducer) {
    reduxStoreModule.registerReducer(componentsProvider.reduxReducer)
  }
  return {ctxFormComponents: componentsProvider.formComponents}
}