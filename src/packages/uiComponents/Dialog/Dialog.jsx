// @flow
import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import MuiDialog from 'material-ui/Dialog'

import inject from '@mindhive/mobx/inject'

const Dialog = ({
  domain,
  styleProps,
  ...other
}) =>
  <MuiDialog
    title={domain.title}
    open={domain.open}
    modal={domain.modal}
    ref={domain.registerNode}
    {...styleProps}
    {...other}
  >

  </MuiDialog>

export default compose(
  withProps(({ domain, styles }) => ({
    registerNode: domain.registerNode,
    styleProps: {
      contentStyle: styles.content,
      bodyStyle: styles.body,
      titleStyle: styles.title,
    },
  })),
  observer,
)(Dialog)
