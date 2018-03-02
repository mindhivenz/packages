//@Flow
import React from 'react'
import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'
import inject from '@mindhive/module-sandbox/modules/inject'

export const selectComponents = select => compose(
  inject(['ctxFormComponents']),
  mapProps(({ctxFormComponents, ...rest}) => {
    if (!ctxFormComponents) {
      throw new Error('"ctxFormComponents" module missing! Import from Form/providers/(reduxForm|...)')
    }
    return { ...select(ctxFormComponents), ...rest }
  })
)

export const withComponent =  (ctxName, rename) =>
  selectComponents(ctxFormComponents => ({
    [rename || ctxName]: ctxFormComponents[ctxName],
  }))

export default (Component: string) =>
  withComponent(Component, 'CtxComponent')
  (({CtxComponent, ...rest}) => <CtxComponent {...rest}/>)
