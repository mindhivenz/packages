import React from 'react'
import PropTypes from 'prop-types'
import SubmitButton from '../SubmitButton'
import CancelButton from '../CancelButton'
import ActionsBar from '../ActionsBar'

import { CtxForm } from '../../internal/ctxComponents'
import ControlledForm from './ControlledForm'

const BasicForm = ({
  children,
  submitLabel,
  hideSubmit,
  cancelLabel,
  hideCancel,
  ...rest
}) =>
  <CtxForm {...rest}>
    {children}
    <ActionsBar>
      <SubmitButton hide={hideSubmit}>
        {submitLabel}
      </SubmitButton>
      <CancelButton hide={hideCancel}>
        {cancelLabel}
      </CancelButton>
    </ActionsBar>
  </CtxForm>

BasicForm.propTypes = {
  children: PropTypes.element,
  submitLabel: PropTypes.string,
  hideSubmit: PropTypes.bool,
  cancelLabel: PropTypes.string,
  hideCancel: PropTypes.bool,
  formId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  isNew: PropTypes.bool,
}

BasicForm.defaultProps = {
  hideSubmit: false,
  hideCancel: false,
}

export default BasicForm
