import React from 'react'
import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'
import upperFirst from 'lodash/upperFirst'
import {CtxTextField} from '../internal/ctxComponents'
import { required as vRequired, email as vEmail } from '../validators'

const TextField = CtxTextField

TextField.defaultProps = {
  autoComplete: 'off',
  margin: 'normal',
  fullWidth: true,
  required: false,
}

export default compose(
  mapProps(({ name, label, email, password, required, type: typeProp, validate, ...rest }) => {
    let valadators = validate || []
    let type = 'text'
    if (required) {
      valadators = [vRequired, ...valadators]
    }
    if (email) {
      valadators = [vEmail, ...valadators]
      type = 'email'
    }
    if (password) {
      type = 'passwor'
    }
    return {
      name,
      label: label || upperFirst(name),
      required,
      validate: valadators,
      type: typeProp || type,
      ...rest,
    }
  })
)(TextField)
