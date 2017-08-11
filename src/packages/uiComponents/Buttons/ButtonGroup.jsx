// @flow
import React from 'react'
import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'
import reverse from 'lodash/reverse'
import withProps from 'recompose/withProps'

import { withClassNames } from '@mindhive/styles'
import AnyButton from '../Buttons/AnyButton'

import applyCss from './css.js'

const ButtonGroup = ({ classNames, buttons, left }) =>
  <div className={classNames}>
    {buttons}
  </div>

export default compose(
  applyCss,
  withClassNames(({ left, classes }) => [classes.buttonGroup, { 'left': left }]),
  mapProps(({buttons, children, left, ...rest}) => {
    const allButtons = buttons.map(buttonProps => <AnyButton {...buttonProps} />) + React.Children.map(children, child => child)

    return ({
      buttons: left ? allButtons.reverse() : allButtons,
      ...rest,
    })
  }),
)(ButtonGroup)
