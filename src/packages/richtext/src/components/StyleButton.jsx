import React from 'react'
import IconButton from 'material-ui/IconButton'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import { injectButtonStyles } from './EditorStyles'

import omitProps from '../utils/omitProps'

const preventDefault = event => event.preventDefault()

const wrapPrevent = callback =>
  (event) => {
    event.preventDefault()
    callback()
  }


const StyleButton = ({
  styles,
  onTouchTap,
  children,
  ...other
}) =>
  <IconButton
    iconStyle={styles.icon}
    style={styles.button}
    onTouchTap={onTouchTap}
    onMouseDown={preventDefault}
    {...other}
  >
    {React.cloneElement(children, {
      color: styles.color,
      hoverColor: styles.focusColor,
    })}
  </IconButton>

export default compose(
  injectButtonStyles,
  withProps(({ toggleStyle, inlineStyle }) => ({
    onTouchTap: wrapPrevent(() => toggleStyle(inlineStyle)),
  })),
  omitProps(['editorState', 'focused', 'theme', 'prepareStyles', 'toggleStyle', 'inlineStyle']),
)(StyleButton)
