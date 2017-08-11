
import { withStyles } from '@mindhive/styles'

export default ({
  palette,
  spacing,
}) => ({
  search: {
    position: 'relative',
    color: palette.disabledColor,
    spinner: {
      color: palette.darkPrimary1Color,
      size: spacing.desktopGutterLess,
    },
  },
})

const animation = 300
const animationOut = 100

const mapThemeToStyles = ({
  dialog,
  spacing,
  palette,
}, {
  disabled,
  secondaryButton,
}) => {
  const secondary = {}
  if (secondaryButton) {
    if (secondaryButton.primary) {
      secondary.position = 'absolute'
      secondary.left = 0
    }
  }
  return ({
    ...dialog.root,
    title: disabled ? dialog.titleDisabled : dialog.title,
    secondary,
    alternateTextColor: palette.alternateTextColor,
    close: {
      button: {
        position: 'absolute',
        height: 33,
        width: 33,
        top: spacing.desktopGutterLess,
        right: spacing.desktopGutterLess,
        padding: 0,
      },
      icon: {
        position: 'absolute',
        height: 33,
        width: 33,
        top: 0,
        right: 0,
        padding: 0,
      },
      color: dialog.closeColor,
      hoverColor: dialog.closeHoverColor,
    },

  })
}

export const injectStylesSheet = Component =>
  withStyles(mapThemeToStyles)(Component)

