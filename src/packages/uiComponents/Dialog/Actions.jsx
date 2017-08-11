// @flow
import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'

import inject from '@mindhive/mobx/inject'

import ButtonGroup from '../ButtonGroup'
import AnyButton from '../Buttons/AnyButton'

const Actions = ({ dialogDomain }) =>
  <ButtonGroup>
    <AnyButton {...dialogDomain.rejectButton} />
    <AnyButton {...dialogDomain.confirmButton} />
    {/*<SecondaryButton {...dialogDomain.rejectButton} />*/}
    {/*<PrimaryButton {...dialogDomain.confirmButton} />*/}
  </ButtonGroup>

export default compose(inject(['dialogDomain']), observer)(Actions)
