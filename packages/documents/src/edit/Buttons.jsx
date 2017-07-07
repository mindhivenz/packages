import React from 'react'

import DiscardButton from './DiscardButton'
import SaveButton from './SaveButton'
import CloseButton from './CloseButton'

import { injectStylesSheet } from './EditStyles'

const Buttons = ({
  closeTouchTap,
  lastFocusId,
  props: {
    isNew,
    docType,
    extraButtons,
    processing,
    pristine,
    submitting,
    valid,
  },
  styles,
}) => {
  const showClose = pristine && ! isNew
  const showButtons = ! pristine || isNew

  const buttons = []
  if (showButtons) {
    buttons.push(
      <DiscardButton onTouchTap={closeTouchTap} />
    )
    buttons.push(
      <SaveButton docType={docType} disabled={pristine || ! valid || submitting || processing} />
    )
  }
  if (extraButtons) {
    buttons.push(extraButtons)
  }
  if (showClose) {
    buttons.push(
      <CloseButton onTouchTap={closeTouchTap} />
    )
  }
  const lastBtn = buttons[buttons.length - 1]
  return (

    <div style={styles.buttons}>
      {buttons.length &&
      buttons.map((button, idx) =>
        React.cloneElement(
          button,
          {
            key: `btn-${idx}-key`,
            id: button === lastBtn ? lastFocusId : undefined,
          }
        )
      )
      }
    </div>
  )
}

export default injectStylesSheet(Buttons)
