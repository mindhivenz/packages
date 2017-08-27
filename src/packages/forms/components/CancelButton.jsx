//@Flow
import React from 'react'

import compose from 'recompose/compose'
import {getCoreFormPropsFromContext} from '../provider/CoreForm'
import Button from './Button'

const CancelButton = props => <Button {...props} />

CancelButton.displayName = 'CancelButton'
CancelButton.defaultProps = {
  children: 'Cancel',
}

export default getCoreFormPropsFromContext(({ onCancel }) => ({ onClick: onCancel }))(
  CancelButton
)
