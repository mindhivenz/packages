import React from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'
import withProps from 'recompose/withProps'
import withContext from 'recompose/withContext'
import getContext from 'recompose/getContext'
import PropsForm from './BasicForm'

export const controllerAsPropFromPropName = propName =>
  withProps((formController, {[propName]: controller}) => ({ formController: formController || controller }))

export const controllerAsContextFromPropName = propName =>
  withContext({ coreFormControllerContext: PropTypes.object }, ({formController, [propName]: controller}) => ({
    coreFormControllerContext: formController || controller,
  }))

export const controllerAsContextFromContextName = contextName => compose(
    getContext({ [contextName]: PropTypes.object }),
    controllerAsContextFromPropName(contextName)
)

export const controllerAsPropFromContextName = contextName => compose(
    getContext({ [contextName]: PropTypes.object }),
    controllerAsPropFromPropName(contextName)
)

//---------------------

export const getControllerFromContext = compose(
  getContext({ coreFormControllerContext: PropTypes.object }),
  mapProps(({ coreFormControllerContext, ...rest }) => ({
    foundControllerFromContext: coreFormControllerContext,
    ...rest,
  }))
)

export const getControllerFromProps = compose(
  mapProps(({ formController, ...rest }) => ({
    foundControllerFromProps: formController,
    ...rest,
  }))
)

export const selectController = mapProps(
  ({ foundControllerFromContext, foundControllerFromProps, ...rest }) => {
    const formController =
      foundControllerFromProps || foundControllerFromContext
    if (!formController) {
      throw new Error(
        `"formController" needed! Try 'controllerAsProp' or 'controllerAsContext' from this file`
      )
    }
    console.log('formController', formController)
    return { formController, ...rest }
  }
)

const ControlledForm = props => <PropsForm {...props} />

ControlledForm.defaultProps = {
  docType: 'doc',
}

export default compose(
  getControllerFromContext,
  getControllerFromProps,
  selectController,
  mapProps(({ document, isNew, docType, formController, ...rest }) => {
    console.log('ControlledForm')
    return {
  onSubmit: fields => formController.onSubmit(fields, isNew),
    onCancel: formController.onCancel,
    initialValues: formController.initialValues(document, isNew),
    form: `${docType}-form-${formController.idFor(document, isNew)}`,
      formId: `${docType}-form`,
      isNew,
      ...rest,
    }
  })
)(ControlledForm)




