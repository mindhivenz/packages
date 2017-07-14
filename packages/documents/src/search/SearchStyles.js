'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectStylesSheet = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _styles = require('@mindhive/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var palette = _ref.palette,
      spacing = _ref.spacing;
  return {
    search: {
      position: 'relative',
      color: palette.disabledColor,
      spinner: {
        color: palette.darkPrimary1Color,
        size: spacing.desktopGutterLess
      }
    }
  };
};

var mapThemeToStyles = function mapThemeToStyles(_ref2, _ref3) {
  var spacing = _ref2.spacing,
      palette = _ref2.palette,
      _ref2$search = _ref2.search,
      color = _ref2$search.color,
      _ref2$search$spinner = _ref2$search.spinner,
      spinnerColor = _ref2$search$spinner.color,
      spinnerSize = _ref2$search$spinner.size,
      other = _ref2$search$spinner.other;
  var _ref3$style = _ref3.style,
      style = _ref3$style === undefined ? {} : _ref3$style,
      _ref3$isList = _ref3.isList,
      isList = _ref3$isList === undefined ? true : _ref3$isList;
  return {
    container: (0, _extends3.default)({
      boxSizing: 'border-box'
    }, style.container),
    icon: (0, _extends3.default)({
      color: color,
      padding: spacing.desktopGutterLess + 'px',
      paddingBottom: spacing.desktopGutterMini + 'px'
    }, style.icon),
    spinnerSize: spinnerSize,
    spinnerColor: spinnerColor,
    spinner: (0, _extends3.default)({
      display: 'inline-block',
      position: 'relative',
      top: -4,
      margin: '24px 20px 0 20px',
      padding: 0
    }, style.spinner),

    textField: (0, _extends3.default)({
      color: color,
      top: -spacing.desktopGutterMini,
      left: isList ? spacing.desktopGutterLess + 'px' : 0
    }, style.textField)
  };
};

var injectStylesSheet = exports.injectStylesSheet = function injectStylesSheet(Component) {
  return (0, _styles.withStyles)(mapThemeToStyles)(Component);
};