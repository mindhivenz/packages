// @flow
import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import MuiDialog from 'material-ui/Dialog'
import EventListener from 'react-event-listener'

import inject from '@mindhive/mobx/inject'
import { injectStylesSheet } from './Styles'

const Dialog = ({
  dialogDomain,
  title,
  styleProps,
  children,
  ...other
}) =>
  <MuiDialog
    ref={dialogDomain.registerNode}
    title={title}
    open={dialogDomain.isOpen}
    modal
    {...styleProps}
    {...other}
  >
    <EventListener
      target="window"
      onKeyUp={dialogDomain.handleKeyUp}
    />
    {children}
  </MuiDialog>

export default compose(
  inject(['dialogDomain']),
  injectStylesSheet,
  withProps(({ dialogDomain, styles }) => ({
    registerNode: dialogDomain.registerNode,
    styleProps: {
      contentStyle: styles.content,
      bodyStyle: styles.body,
      titleStyle: styles.title,
    },
  })),
  observer,
)(Dialog)
