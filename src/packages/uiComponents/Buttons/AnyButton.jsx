// @flow
import React from 'react'

import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from './propHelper'

const getButton = (buttonType: string) => {
  switch (buttonType) {
    case(BUTTON_PRIMARY): return PrimaryButton
    case(BUTTON_SECONDARY): return SecondaryButton
    default: return PrimaryButton
  }
}

const AnyButton = ({buttonType, ...props}: {buttonType: string}) => {
  const Button = getButton(buttonType)
  return <Button {...props} />
}

export default AnyButton
