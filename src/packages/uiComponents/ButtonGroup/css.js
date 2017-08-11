import compose from 'recompose/compose'
import { applyTheme } from '@mindhive/styles'

const mapThemeToStyles = ({ spacing }) => ({
  buttonGroup: {
    marginTop: spacing.desktopGutter,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '0 5px',
    '&.left': {
      textAlign: 'left',
    },
    '& btnGroupChild': {
      flex: '1 1 auto',
      magin: '0 5px',
    }
  },
})

export default Component =>
  compose(
    applyTheme({
      mapThemeToStyles,
      classesName: 'classes',
    })
  )(Component)
