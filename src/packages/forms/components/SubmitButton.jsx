import React from 'react'

import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'
import {getCoreFormPropsFromContext} from '../provider/CoreForm'
import Button from './Button'

const SubmitButton = ({
  CtxButton,
  pristine,
  valid,
  submitting,
  processing,
  ...rest
}) =>
  <Button disabled={pristine || !valid || submitting || processing} {...rest} />

SubmitButton.displayName = 'SubmitButton'
SubmitButton.defaultProps = {
  children: 'Submit',
  type: 'submit',
  color: 'primary',
  raised: true,
}

export default compose(
  getCoreFormPropsFromContext(({ pristine, valid, submitting, processing }) => ({
    pristine,
    valid,
    submitting,
    processing,
  })),
  mapProps(({ children, label, ...rest }) => ({
    children: label || children,
    ...rest,
  }))
)(SubmitButton)
