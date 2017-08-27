import React from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import withContext from 'recompose/withContext'
import getContext from 'recompose/getContext'
import mapProps from 'recompose/mapProps'

export const getCoreFormPropsFromContext = withProps => compose(
  getContext({
    coreFormPropsContext: PropTypes.object
  }),
  mapProps(({ coreFormPropsContext, ...rest }) => {
    if (!coreFormPropsContext) {
      throw new Error('"coreFormPropsContext" missing! Form components need to be nested inside a <Form> component')
    }
    return ({
      ...withProps(coreFormPropsContext),
      ...rest,
    })
  }),
)

const storeCoreFormPropsToContext = withContext(
  {coreFormPropsContext: PropTypes.object},
  ({ formId, handleSubmit, onCancel, processing, pristine, submitting, valid }) => ({
    coreFormPropsContext: {
      formId,
      handleSubmit,
      onCancel,
      processing,
      pristine,
      submitting,
      valid,
    },
  })
)

const CoreForm = ({ formId, handleSubmit, children }) =>
  <form id={formId} onSubmit={handleSubmit}>
    {children}
  </form>

CoreForm.displayName = 'CoreForm'

export default storeCoreFormPropsToContext(CoreForm)
