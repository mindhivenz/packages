import compose from 'recompose/compose'
import { applyTheme } from '@mindhive/styles'

const mapThemeToStyles = ({ spacing }) => ({
  buttonGroup: {
    marginTop: spacing.desktopGutter,
    textAlign: 'right',
    position: 'relative',
    '&.left': {
      textAlign: 'left',
    },
  },
})

export default Component =>
  compose(
    applyTheme({
      mapThemeToStyles,
      classesName: 'classes',
    })
  )(Component)
