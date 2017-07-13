import { withStyles } from '@mindhive/styles'
import compose from 'recompose/compose'
import transitions from 'material-ui/styles/transitions'

const iconSize = 15
const btnPadding = 2
const btnSize = iconSize + btnPadding

export const injectButtonStyles = compose(withStyles(({
  palette,
  textField: {
    focusColor,
  },
}, {
  focused,
  editorState,
  inlineStyle,
}) => ({
  color: focused && editorState.getCurrentInlineStyle().has(inlineStyle) ? focusColor : palette.textColor,
  icon: {
    width: iconSize,
    height: iconSize,
  },
  button: {
    width: btnSize,
    height: btnSize,
    padding: btnPadding,
  },
})))

export const injectLabelStyles = compose(withStyles(({
  textField: {
    floatingLabelColor,
    hintColor,
    focusColor,
    errorColor,
  },
}, {
  disabled,
  focused,
  shrink,
  shrinkStyle,
  style,
  errorText,
}) => ({
  color: focused ? (errorText ? errorColor : focusColor) : hintColor,
  position: 'absolute',
  lineHeight: '22px',
  top: 24,
  transition: transitions.easeOut(),
  zIndex: 1, // Needed to display label above Chrome's autocomplete field background
  cursor: disabled ? 'not-allowed' : 'text',
  transform: 'scale(1) translate(0, 0)',
  transformOrigin: 'left top',
  pointerEvents: 'auto',
  userSelect: 'none',
  ...style,
  ...(shrink ? {
    transform: 'scale(0.75) translate(0, -24px)',
    pointerEvents: 'none',
    ...shrinkStyle,
  } : {}),
})))

export const injectUnderlineStyles = compose(withStyles(({
  textField: {
    borderColor,
    disabledTextColor,
    errorColor,
    focusColor,
  },
}, {
  disabled,
  disabledStyle = {},
  errorText,
  errorStyle = {},
  focus,
  focusStyle = {},
  style,
}) => {
  const { color: errorStyleColor } = errorStyle

  const styles = {
    root: {
      border: 'none',
      borderBottom: 'solid 1px',
      borderColor,
      bottom: 12,
      boxSizing: 'content-box',
      margin: 0,
      position: 'absolute',
      width: '100%',
      transition: 'all 450ms ease-out',
    },
    disabled: {
      borderBottom: 'dotted 2px',
      borderColor: disabledTextColor,
      cursor: 'not-allowed',
    },
    focus: {
      borderBottom: 'solid 2px',
      borderColor: focusColor,
      transform: 'scaleX(0)',

    },
    error: {
      borderColor: errorStyleColor || errorColor,
      transform: 'scaleX(1)',
    },
  }

  let underline = Object.assign({}, styles.root, style)
  let focusedUnderline = Object.assign({}, underline, styles.focus, focusStyle)

  if (disabled) underline = Object.assign({}, underline, styles.disabled, disabledStyle)
  if (focus) focusedUnderline = Object.assign({}, focusedUnderline, {transform: 'scaleX(1)' })
  if (errorText) focusedUnderline = Object.assign({}, focusedUnderline, styles.error)

  return ({
    underline,
    focusedUnderline,
  })
}))

