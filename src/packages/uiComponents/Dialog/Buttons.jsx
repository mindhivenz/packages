// @flow
import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

import inject from '@mindhive/mobx/inject'

import { injectStylesSheet } from './Styles'

const Buttons = ({
  buttonsStyle,
  dialogDomain,
}) =>
  <div style={buttonsStyle}>
    {dialogDomain.secondaryButton && <SecondaryButton {...dialogDomain.secondaryButton} />}
    {dialogDomain.primaryButton && <PrimaryButton {...dialogDomain.primaryButton} />}
  </div>

export default compose(
  inject(['dialogDomain']),
  injectStylesSheet,
  withProps(({ dialogDomain, styles, prepareStyles }) => ({
    buttonsStyle: prepareStyles(styles.buttons),
  })),
  observer,
)(Buttons)
