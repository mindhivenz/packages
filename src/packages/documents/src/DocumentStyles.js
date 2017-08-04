import { grey200, grey400 } from 'material-ui/styles/colors'

export default ({
  palette,
  colorManipulator,
  raisedButton,
  paper,
}) => ({
  docStatefulIcon: {
    disabledColor: grey200,
  },
  docDropDownMenu: {
    iconColor: grey400,
    backgroundColor: paper.backgroundColor,
    disabledColor: palette.disabledColor,

  },
  docList: {
    iconColor: grey400,
    iconHoveredColor: palette.primary1Color,
    iconHoveredOpacity: 0.5,
    primaryTextDisabledColor: palette.disabledColor,
    primaryTextHoveredColor: colorManipulator.darken(palette.darkPrimary1Color, 0.45),
    secondaryTextDisabledColor: palette.disabledColor,
  },
  docEdit: {
    saveButtonColor: palette.accent1Color,
    saveButtonDisabledBackgroundColor: raisedButton.disabledColor,
    closeButtonColor: palette.borderColor,
    closeButtonHoverColor: palette.errorText,
    discardButtonColor: palette.errorText,
  },



})

