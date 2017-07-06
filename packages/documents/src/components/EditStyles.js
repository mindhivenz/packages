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

const mapThemeToStyles = (theme) => {
  const zIndex = 1400
  const {
    saveButtonColor,
    saveButtonDisabledBackgroundColor,
    closeButtonColor,
    closeButtonHoverColor,
    discardButtonColor,
  } = theme.docEdit

  return {
    root: {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      zIndex,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    container: {
      ...theme.paper,
      boxShadow: theme.paper.zDepthShadows[0],
      borderRadius: '2px',
      position: 'relative',
      willChange: 'opacity, max-height',
      overflow: 'hidden',
      transform: 'scale(1.025, 1)',
      maxHeight: '48px',

      // opacity: 0,
      // maxHeight: 0,
      // transition: `opacity ${animation} ease-out, max-height ${animation} ease-out`,
      // transition: `${transitions.easeOut(animation, 'all')}, max-height 0.15s ease-out`,

      zIndex: zIndex + 5,
    },
    shown: {
      opacity: 1,
      maxHeight: '2000px',
      transition: `opacity ${animation}ms ease-in, max-height ${animation}ms ease-in`,
      // transition: transitions.easeOut(`${animation}ms`, 'all'),
    },
    hidden: {
      opacity: 0.01,
      maxHeight: 0,
      transition: `opacity ${animationOut}ms ease-in, max-height ${animationOut}ms ease-in`,
      // transition: transitions.easeOut(`${animation}ms`, 'all'),
    },
    overlay: {
      zIndex,
    },
    name: {
      width: '210px',
      marginRight: `${theme.spacing.desktopGutter}px`,
    },
    worksheet: {
      width: '210px',
    },
    icon: {
      marginTop: '42px',
      color: theme.palette.primary1Color,
    },
    buttons: {
      // position: 'absolute',
      // right: `${theme.spacing.desktopGutter}px`,
      // top: `${theme.spacing.desktopGutterMore}px`,
      // display: 'inline-block',
      textAlign: 'right',

    },
    save: {
      backgroundColor: saveButtonColor,
      disabledBackgroundColor: saveButtonDisabledBackgroundColor,
      // marginRight: theme.spacing.desktopGutterMini,
    },
    close: {
      color: closeButtonColor,
      // hoverColor: closeButtonHoverColor,
      // marginRight: theme.spacing.desktopGutterMini,
    },
    discard: {
      color: discardButtonColor,
      marginRight: theme.spacing.desktopGutterMini,
    },
  }
}

export const injectStylesSheet = Component =>
  withStyles(mapThemeToStyles)(Component)

