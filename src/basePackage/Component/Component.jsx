// @flow
import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'

import inject from '@mindhive/mobx/inject'

const Component = ({...other}) => <div {...other}>New Component!</div>

export default compose(
  observer,
)(Component)
