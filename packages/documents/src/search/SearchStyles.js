import withStyles from '../../styles/src/withStyles'

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

const mapThemeToStyles = ({
  spacing,
  palette,
  search: {
    color,
    spinner: {
      color: spinnerColor,
      size: spinnerSize,
      other,
    },
  },
}, {
  style = {},
  isList = true,
}) => ({
  container: {
    boxSizing: 'border-box',
    ...style.container,
  },
  icon: {
    color,
    padding: `${spacing.desktopGutterLess}px`,
    paddingBottom: `${spacing.desktopGutterMini}px`,
    ...style.icon,
  },
  spinnerSize,
  spinnerColor,
  spinner: {
    display: 'inline-block',
    position: 'relative',
    top: -4,
    margin: '24px 20px 0 20px',
    padding: 0,
    ...style.spinner,
  },

  textField: {
    color,
    top: -spacing.desktopGutterMini,
    left: isList ? `${spacing.desktopGutterLess}px` : 0,
    ...style.textField,
  },
})

export const injectStylesSheet = Component =>
  withStyles(mapThemeToStyles)(Component)

