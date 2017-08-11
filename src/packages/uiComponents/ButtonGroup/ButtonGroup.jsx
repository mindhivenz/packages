// @flow
import React from 'react'
import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'
import reverse from 'lodash/reverse'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'
import withProps from 'recompose/withProps'

import { withClassNames } from '@mindhive/styles'
import AnyButton from '../Buttons/AnyButton'

import applyCss from './css.js'

const ButtonGroup = ({ classNames, children, left }) =>
  <div className={classNames}>
    {children}
  </div>

export default compose(
  applyCss,
  withClassNames(({ left, classes }) => [classes.buttonGroup, { left: left }]),
  mapProps(({ buttons, children, left, ...rest }) => {
    const allButtons = unionWith(
      buttons.map(buttonProps => <AnyButton {...buttonProps} />),
      React.Children.map(children, child => child),
      isEqual
    ).map((child, i) => React.cloneElement(child, {key: `ButtonGroupBtn${i}`}))
    return {
      children: left ? allButtons.reverse() : allButtons,
      ...rest,
    }
  })
)(ButtonGroup)
