// @flow
import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import MuiDialog from 'material-ui/Dialog'
import EventListener from 'react-event-listener'

import inject from '@mindhive/mobx/inject'
import { injectStylesSheet } from './Styles'
import DialogActions from './Actions'

const Dialog = ({
  dialogDomain,
  title,
  dialogStyles,
  buttonsStyle,
  children,
  ...other
}) =>
  <MuiDialog
    ref={dialogDomain.registerNode}
    title={dialogDomain.title}
    open={dialogDomain.isOpen}
    modal={dialogDomain.modal}
    {...dialogStyles}
    {...other}>
    <EventListener target="window" onKeyUp={dialogDomain.handleKeyUp} />
    {children || dialogDomain.message}
    <DialogActions />
  </MuiDialog>

export default compose(
  inject(['dialogDomain']),
  injectStylesSheet,
  withProps(({ dialogDomain, styles }) => ({
    registerNode: dialogDomain.registerNode,
    dialogStyles: {
      contentStyle: styles.content,
      bodyStyle: styles.body,
      titleStyle: styles.title,
    },
    buttonsStyle: styles.buttons,
  })),
  observer
)(Dialog)
