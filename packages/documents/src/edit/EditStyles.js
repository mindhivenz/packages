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

var animation = 300;
var animationOut = 100;

var mapThemeToStyles = function mapThemeToStyles(theme) {
  var zIndex = 1400;
  var _theme$docEdit = theme.docEdit,
      saveButtonColor = _theme$docEdit.saveButtonColor,
      saveButtonDisabledBackgroundColor = _theme$docEdit.saveButtonDisabledBackgroundColor,
      closeButtonColor = _theme$docEdit.closeButtonColor,
      closeButtonHoverColor = _theme$docEdit.closeButtonHoverColor,
      discardButtonColor = _theme$docEdit.discardButtonColor;


  return {
    root: {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      zIndex: zIndex,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },
    container: (0, _extends3.default)({}, theme.paper, {
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

      zIndex: zIndex + 5
    }),
    shown: {
      opacity: 1,
      maxHeight: '2000px',
      transition: 'opacity ' + animation + 'ms ease-in, max-height ' + animation + 'ms ease-in'
      // transition: transitions.easeOut(`${animation}ms`, 'all'),
    },
    hidden: {
      opacity: 0.01,
      maxHeight: 0,
      transition: 'opacity ' + animationOut + 'ms ease-in, max-height ' + animationOut + 'ms ease-in'
      // transition: transitions.easeOut(`${animation}ms`, 'all'),
    },
    overlay: {
      zIndex: zIndex
    },
    name: {
      width: '210px',
      marginRight: theme.spacing.desktopGutter + 'px'
    },
    worksheet: {
      width: '210px'
    },
    icon: {
      marginTop: '42px',
      color: theme.palette.primary1Color
    },
    buttons: {
      // position: 'absolute',
      // right: `${theme.spacing.desktopGutter}px`,
      // top: `${theme.spacing.desktopGutterMore}px`,
      // display: 'inline-block',
      marginTop: theme.spacing.desktopGutter,
      textAlign: 'right'

    },
    save: {
      backgroundColor: saveButtonColor,
      disabledBackgroundColor: saveButtonDisabledBackgroundColor
      // marginRight: theme.spacing.desktopGutterMini,
    },
    close: {
      color: closeButtonColor
      // hoverColor: closeButtonHoverColor,
      // marginRight: theme.spacing.desktopGutterMini,
    },
    discard: {
      color: discardButtonColor,
      marginRight: theme.spacing.desktopGutterMini
    }
  };
};

var injectStylesSheet = exports.injectStylesSheet = function injectStylesSheet(Component) {
  return (0, _styles.withStyles)(mapThemeToStyles)(Component);
};