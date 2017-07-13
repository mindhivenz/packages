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
