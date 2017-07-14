'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('material-ui/styles/colors');

exports.default = function (_ref) {
  var palette = _ref.palette,
      colorManipulator = _ref.colorManipulator,
      raisedButton = _ref.raisedButton;
  return {
    docStatefulIcon: {
      disabledColor: _colors.grey200
    },
    docDropDownMenu: {
      iconColor: _colors.grey400
    },
    docList: {
      iconColor: _colors.grey400,
      iconHoveredColor: palette.primary1Color,
      iconHoveredOpacity: 0.5,
      primaryTextDisabledColor: palette.disabledColor,
      primaryTextHoveredColor: colorManipulator.darken(palette.darkPrimary1Color, 0.45),
      secondaryTextDisabledColor: palette.disabledColor
    },
    docEdit: {
      saveButtonColor: palette.accent1Color,
      saveButtonDisabledBackgroundColor: raisedButton.disabledColor,
      closeButtonColor: palette.borderColor,
      closeButtonHoverColor: palette.errorText,
      discardButtonColor: palette.errorText
    }
  };
};