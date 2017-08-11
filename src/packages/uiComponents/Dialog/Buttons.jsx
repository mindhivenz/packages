// @flow
import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'

import inject from '@mindhive/mobx/inject'

import ButtonGroup from '../ButtonGroup'

import PrimaryButton from '../Buttons/PrimaryButton'
import SecondaryButton from '../Buttons/SecondaryButton'


import { injectStylesSheet } from './Styles'

const Buttons = ({ dialogDomain }) =>
  <ButtonGroup>
    <SecondaryButton {...dialogDomain.rejectButton} />
    <PrimaryButton {...dialogDomain.confirmButton} />
  </ButtonGroup>

export default compose(
  inject(['dialogDomain']),
  injectStylesSheet,
  observer
)(Buttons)
