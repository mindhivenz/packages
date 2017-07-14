import React from 'react'

import PropTypes from 'prop-types'

const docEditContextTypes = {
  docEditForm: PropTypes.string,
}

export default (Comp) => {
  const component = (props, context) =>
    <Comp {...context} {...props} />
  component.contextTypes = docEditContextTypes
  return component
}