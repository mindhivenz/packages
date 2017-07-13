import { withStyles, applyTheme, withClassNames } from '@mindhive/styles'
import { observer } from 'mobx-react'

import compose from 'recompose/compose'
import transitions from 'material-ui/styles/transitions'


const iconSize = 20
const btnPadding = 2
const btnSize = btnPadding + iconSize + btnPadding

const commandTransitionMs = 250

const commandPanelSizing = {
  iconSize,
  btnPadding,
  btnSize,
  height: btnSize,
  width: (btnSize * 3) + 2,
  top: 24,
  smallTop: 32 + btnSize,
}

const labelLineHeight = 22
const labelTop = 24

const errorFontSize = 12

export const injectEditorClasses = compose(
  observer,
  applyTheme({
    mapThemeToStyles: ({
      textField: {
        floatingLabelColor,
        hintColor,
        focusColor,
        errorColor,
      },
      spacing,
      typography,
    }, {
      editorDomain, editorStyle, containerStyle,
    }) => ({
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
          width: `calc(100% - ${commandPanelSizing.width + spacing.desktopGutterLess}px)`,
          transition: `width ${commandTransitionMs}ms ease-out`,
        },

      },

      commandPanel: {
        top: commandPanelSizing.top,
        width: `${0}px`,
        position: 'absolute',
        right: 0,
        opacity: 0,
        transition: `width ${commandTransitionMs}ms ease-out,
                    opacity ${commandTransitionMs}ms ease-out,
                    transform ${commandTransitionMs}ms ease-out`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'inline-block',

        '&.debug': {
          border: '1px dashed red',
        },

        '&.focused': {
          opacity: 1,
          width: `${commandPanelSizing.width}px`,
        },
      },
      editorLabel: {
        color: hintColor,
        position: 'absolute',
        lineHeight: `${labelLineHeight}px`,
        top: labelTop,
        transition: transitions.easeOut(),
        zIndex: 1, // Needed to display label above Chrome's autocomplete field background
        cursor: editorDomain.disabled ? 'not-allowed' : 'text',
        transform: 'scale(1) translate(0, 0)',
        transformOrigin: 'left top',
        pointerEvents: 'auto',
        userSelect: 'none',
        '&.focused': {
          color: focusColor,
        },
        '&.error': {
          color: errorColor,
        },
        '&.shrink': {
          transform: `scale(0.75) translate(0, -${labelTop}px)`,
          pointerEvents: 'none',
        },

      },
      '@media (max-width: 550px)': {
        commandPanel: {
          top: commandPanelSizing.smallTop,
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
  observer,
  withClassNames(({ editorDomain, editorClasses, debug }) => ({
    container: [
      editorClasses.container,
      {
        'focused': editorDomain.isFocused,
        'debug': debug,
      },
    ],
    editorWrapper: [
      editorClasses.editorPanel,
      {
        'focused': editorDomain.isFocused,
        'debug': debug,
      },
    ],
    commandsWrapper: [
      editorClasses.commandPanel,
      {
        'focused': editorDomain.isFocused,
        'debug': debug,
      },
    ],
    editorLabel: [
      editorClasses.editorLabel,
      {
        'focused': editorDomain.isFocused,
        'error': editorDomain.hasError,
        'shrink': editorDomain.shrinkLabel,
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
