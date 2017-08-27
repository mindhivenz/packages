import React from 'react'
import PropTypes from 'prop-types'
import FormComponent from './internal/ControlledForm'

const Form = props => <FormComponent {...props}/>

Form.propTypes = {
  children: PropTypes.element,
  submitLabel: PropTypes.string,
  hideSubmit: PropTypes.bool,
  cancelLabel: PropTypes.string,
  hideCancel: PropTypes.bool,

  /**
   * Id attached to the HTML <form> element, i.e. <form id={formId}>
   */
  formId: PropTypes.string.isRequired,
  /**
   * Function to handle form submission: (fields) => Promise
   *  resolve if successful
   *  reject for errors, validations etc
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Called when the user cancels the form
   */
  onCancel: PropTypes.func.isRequired,
  /**
   * Object containing the data for the form. These keys are what you pass to the fields as name, i.e.
   *  {
   *    email: 'some@email.com',
   *    ....
   *  }
   *
   *  then in your form link like so:
   *
   *  <TextField name='email' ... />
   */
  initialValues: PropTypes.object.isRequired,
  /**
   * Helpful for validation and styling
   */
  isNew: PropTypes.bool,
}

Form.defaultProps = {
  hideSubmit: false,
  hideCancel: false,
}

export default Form
