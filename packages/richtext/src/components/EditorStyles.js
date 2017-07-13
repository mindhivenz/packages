import { withStyles, applyTheme, withClassNames } from '@mindhive/styles'
import { observer } from 'mobx-react'

import compose from 'recompose/compose'
import transitions from 'material-ui/styles/transitions'


const iconSize = 20
const smallIconSize = 15

const btnPadding = 2

const btnSize = btnPadding + iconSize + btnPadding
const smallBtnSize = btnPadding + smallIconSize + btnPadding

const btnContainerSize = (btnSize * 3) + 2
const smallBtnContainerSize = (smallBtnSize * 3) + 2

const commandTransitionMs = 250

const buttonSizes = {
  iconSize,
  padding: btnPadding,
  btnSize,
  containerHeight: btnSize,
  containerWidth: btnContainerSize,
  top: 24,
}

const smallButtonSizes = {
  iconSize: smallIconSize,
  padding: btnPadding,
  btnSize: smallBtnSize,
  containerHeight: smallBtnSize,
  containerWidth: smallBtnContainerSize,
  top: 32 + btnSize,
}

const labelLineHeight = 22
const labelTop = 24

const errorFontSize = 12

export const injectEditorStyles = compose(withStyles(({
  spacing,
  typography,

  textField: {
    hintColor,
    focusColor,
    errorColor,
  },
}, {
  containerStyle = {},
  editorStyle = {},
  editorDomain,
}) => ({
  focusColor,
  hintColor,
  label: {
    display: 'inline-block',
    position: 'relative',
    top: -5,

    fontSize: 103,
  },
  content: {
    position: 'relative',
    cursor: 'initial',

    fontSize: 16,
    lineHeight: '24px',
    width: '100%',
    display: 'inline-block',

    paddingTop: spacing.desktopGutterLess,
    paddingBottom: spacing.desktopGutterMini,

    ...containerStyle,
  },
  editor: {
    position: 'relative',
    width: `calc(100% - ${editorDomain.focused ? btnContainerSize : 0}px)`,
    transition: transitions.easeOut(),

    display: 'inline-block',
    paddingTop: spacing.desktopGutterMini,
    fontWeight: typography.fontWeight300,
    fontSize: 14,
    ...editorStyle,

  },
  debugEditor: {
    border: '1px dashed green',
  },
  debugContent: {
    border: '1px dashed yellow',
  },

})))


export const injectEditorClasses = compose(
  observer,
  applyTheme({
    mapThemeToStyles: ({ spacing, typography }, { editorStyle, containerStyle }) => ({
      container: {
        position: 'relative',
        cursor: 'initial',

        fontSize: 16,
        lineHeight: '24px',
        width: '100%',
        display: 'inline-block',

        paddingTop: spacing.desktopGutterLess,
        paddingBottom: spacing.desktopGutterMini,

        ...containerStyle,
      },

      editorPanel: {
        position: 'relative',
        width: '100%',
        transition: `width ${commandTransitionMs}ms ease-out`,

        display: 'inline-block',
        paddingTop: spacing.desktopGutterMini,
        fontWeight: typography.fontWeight300,
        fontSize: 14,
        ...editorStyle,
        '&.debug': {
          border: '1px dashed green',
        },

        '&.focused': {
          width: `calc(100% - ${buttonSizes.containerWidth + spacing.desktopGutterLess}px)`,
          transition: `width ${commandTransitionMs}ms ease-out`,
        },

      },

      commandPanel: {
        position: 'absolute',
        right: 0,
        top: buttonSizes.top,

        opacity: 0,
        width: `${0}px`,
        transition: `width ${commandTransitionMs}ms ease-out,
                    opacity ${commandTransitionMs}ms ease-out`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'inline-block',

        '&.debug': {
          border: '1px dashed red',
        },

        '&.focused': {
          opacity: 1,
          width: `${buttonSizes.containerWidth}px`,
          transition: `width ${commandTransitionMs}ms ease-out,
                    opacity ${commandTransitionMs}ms ease-out`,

        },
      },
      '@media (max-width: 550px)': {
        commandPanel: {

          top: smallButtonSizes.top,
          width: `${buttonSizes.containerWidth}px`,
        },
        editorPanel: {
          '&.focused': {
            width: '100%',
          },

        },

      },
    }),
    classesName: 'editorClasses',
  }),
  withClassNames(({ editorDomain, editorClasses, debug }) => ({
    container: [
      editorClasses.container,
      {
        'focused': editorDomain.focused,
        'debug': debug,
      },
    ],
    editorWrapper: [
      editorClasses.editorPanel,
      {
        'focused': editorDomain.focused,
        'debug': debug,
      },
    ],
    commandsWrapper: [
      editorClasses.commandPanel,
      {
        'focused': editorDomain.focused,
        'debug': debug,
      },
    ],
  })),

)

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
  debug,
  disabled,
  focused,
  shrink,
  shrinkStyle,
  style,
  errorText,
}) => ({
  border: debug ? '1px dashed orange' : 'none',
  color: focused ? (errorText ? errorColor : focusColor) : hintColor,
  position: 'absolute',
  lineHeight: `${labelLineHeight}px`,
  top: labelTop,
  transition: transitions.easeOut(),
  zIndex: 1, // Needed to display label above Chrome's autocomplete field background
  cursor: disabled ? 'not-allowed' : 'text',
  transform: 'scale(1) translate(0, 0)',
  transformOrigin: 'left top',
  pointerEvents: 'auto',
  userSelect: 'none',
  ...style,
  ...(shrink ? {
    transform: `scale(0.75) translate(0, -${labelTop}px)`,
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
  if (focus) focusedUnderline = Object.assign({}, focusedUnderline, { transform: 'scaleX(1)' })
  if (errorText) focusedUnderline = Object.assign({}, focusedUnderline, styles.error)

  return ({
    underline,
    focusedUnderline,
  })
}))

export const injectErrorStyles = compose(withStyles(({
  textField: {
    errorColor,
  },
}, {
  errorText,
}) => ({
  position: 'relative',
  bottom: -8,
  fontSize: errorFontSize,
  fontWeight: 400,
  lineHeight: `${errorFontSize}px`,
  color: errorColor,
  transition: 'transform 450ms ease-out',
  transform: `scaleY(${errorText ? 1 : 0})`,
})))
