// @flow
import React from 'react'
import compose from 'recompose/compose'
import reverse from 'lodash/reverse'
import withProps from 'recompose/withProps'

import { withClassNames } from '@mindhive/styles'

import applyCss from './css.js'

const ButtonGroup = ({ classNames, children, left }) =>
  <div className={classNames}>
    {left ? React.Children.map(children, child => child).reverse() : children }
  </div>

export default compose(
  applyCss,
  withClassNames(({ left, classes }) => [classes.buttonGroup, { 'left': left }])
)(ButtonGroup)
