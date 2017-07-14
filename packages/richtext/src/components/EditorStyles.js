'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectErrorStyles = exports.injectUnderlineStyles = exports.injectButtonStyles = exports.injectEditorClasses = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _styles = require('@mindhive/styles');

var _mobxReact = require('mobx-react');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _transitions = require('material-ui/styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconSize = 20;
var btnPadding = 2;
var btnSize = btnPadding + iconSize + btnPadding;

var commandTransitionMs = 250;

var commandPanelSizing = {
  iconSize: iconSize,
  btnPadding: btnPadding,
  btnSize: btnSize,
  height: btnSize,
  width: btnSize * 3 + 2,
  top: 24,
  smallTop: 32 + btnSize
};

var labelLineHeight = 22;
var labelTop = 24;

var errorFontSize = 12;

var injectEditorClasses = exports.injectEditorClasses = (0, _compose2.default)(_mobxReact.observer, (0, _styles.applyTheme)({
  mapThemeToStyles: function mapThemeToStyles(_ref, _ref2) {
    var _ref$textField = _ref.textField,
        floatingLabelColor = _ref$textField.floatingLabelColor,
        hintColor = _ref$textField.hintColor,
        focusColor = _ref$textField.focusColor,
        errorColor = _ref$textField.errorColor,
        spacing = _ref.spacing,
        typography = _ref.typography;
    var editorDomain = _ref2.editorDomain,
        editorStyle = _ref2.editorStyle,
        containerStyle = _ref2.containerStyle;
    return {
      container: (0, _extends3.default)({
        position: 'relative',
        cursor: 'initial',

        fontSize: 16,
        lineHeight: '24px',
        width: '100%',
        display: 'inline-block',

        paddingTop: spacing.desktopGutterLess,
        paddingBottom: spacing.desktopGutterMini

      }, containerStyle),

      editorPanel: (0, _extends3.default)({
        position: 'relative',
        width: '100%',
        transition: 'width ' + commandTransitionMs + 'ms ease-out',

        display: 'inline-block',
        paddingTop: spacing.desktopGutterMini,
        fontWeight: typography.fontWeight300,
        fontSize: 14
      }, editorStyle, {
        '&.debug': {
          border: '1px dashed green'
        },

        '&.focused': {
          width: 'calc(100% - ' + (commandPanelSizing.width + spacing.desktopGutterLess) + 'px)',
          transition: 'width ' + commandTransitionMs + 'ms ease-out'
        }

      }),

      commandPanel: {
        top: commandPanelSizing.top,
        width: 0 + 'px',
        position: 'absolute',
        right: 0,
        opacity: 0,
        transition: 'width ' + commandTransitionMs + 'ms ease-out,\n                    opacity ' + commandTransitionMs + 'ms ease-out,\n                    transform ' + commandTransitionMs + 'ms ease-out',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'inline-block',

        '&.debug': {
          border: '1px dashed red'
        },

        '&.focused': {
          opacity: 1,
          width: commandPanelSizing.width + 'px'
        }
      },
      editorLabel: {
        color: hintColor,
        position: 'absolute',
        lineHeight: labelLineHeight + 'px',
        top: labelTop,
        transition: _transitions2.default.easeOut(),
        zIndex: 1, // Needed to display label above Chrome's autocomplete field background
        cursor: editorDomain.disabled ? 'not-allowed' : 'text',
        transform: 'scale(1) translate(0, 0)',
        transformOrigin: 'left top',
        pointerEvents: 'auto',
        userSelect: 'none',
        '&.focused': {
          color: focusColor
        },
        '&.error': {
          color: errorColor
        },
        '&.shrink': {
          transform: 'scale(0.75) translate(0, -' + labelTop + 'px)',
          pointerEvents: 'none'
        }

      },
      '@media (max-width: 550px)': {
        commandPanel: {
          top: commandPanelSizing.smallTop
        },
        editorPanel: {
          '&.focused': {
            width: '100%'
          }
        }

      }
    };
  },
  classesName: 'editorClasses'
}), _mobxReact.observer, (0, _styles.withClassNames)(function (_ref3) {
  var editorDomain = _ref3.editorDomain,
      editorClasses = _ref3.editorClasses,
      debug = _ref3.debug;
  return {
    container: [editorClasses.container, {
      'focused': editorDomain.isFocused,
      'debug': debug
    }],
    editorWrapper: [editorClasses.editorPanel, {
      'focused': editorDomain.isFocused,
      'debug': debug
    }],
    commandsWrapper: [editorClasses.commandPanel, {
      'focused': editorDomain.isFocused,
      'debug': debug
    }],
    editorLabel: [editorClasses.editorLabel, {
      'focused': editorDomain.isFocused,
      'error': editorDomain.hasError,
      'shrink': editorDomain.shrinkLabel
    }]
  };
}));

var injectButtonStyles = exports.injectButtonStyles = (0, _compose2.default)((0, _styles.withStyles)(function (_ref4, _ref5) {
  var palette = _ref4.palette,
      focusColor = _ref4.textField.focusColor;
  var focused = _ref5.focused,
      editorState = _ref5.editorState,
      inlineStyle = _ref5.inlineStyle;
  return {
    color: focused && editorState.getCurrentInlineStyle().has(inlineStyle) ? focusColor : palette.textColor,
    icon: {
      width: iconSize,
      height: iconSize
    },
    button: {
      width: btnSize,
      height: btnSize,
      padding: btnPadding
    }
  };
}));

var injectUnderlineStyles = exports.injectUnderlineStyles = (0, _compose2.default)((0, _styles.withStyles)(function (_ref6, _ref7) {
  var _ref6$textField = _ref6.textField,
      borderColor = _ref6$textField.borderColor,
      disabledTextColor = _ref6$textField.disabledTextColor,
      errorColor = _ref6$textField.errorColor,
      focusColor = _ref6$textField.focusColor;
  var disabled = _ref7.disabled,
      _ref7$disabledStyle = _ref7.disabledStyle,
      disabledStyle = _ref7$disabledStyle === undefined ? {} : _ref7$disabledStyle,
      errorText = _ref7.errorText,
      _ref7$errorStyle = _ref7.errorStyle,
      errorStyle = _ref7$errorStyle === undefined ? {} : _ref7$errorStyle,
      focus = _ref7.focus,
      _ref7$focusStyle = _ref7.focusStyle,
      focusStyle = _ref7$focusStyle === undefined ? {} : _ref7$focusStyle,
      style = _ref7.style;
  var errorStyleColor = errorStyle.color;


  var styles = {
    root: {
      border: 'none',
      borderBottom: 'solid 1px',
      borderColor: borderColor,
      bottom: 12,
      boxSizing: 'content-box',
      margin: 0,
      position: 'absolute',
      width: '100%',
      transition: 'all 450ms ease-out'
    },
    disabled: {
      borderBottom: 'dotted 2px',
      borderColor: disabledTextColor,
      cursor: 'not-allowed'
    },
    focus: {
      borderBottom: 'solid 2px',
      borderColor: focusColor,
      transform: 'scaleX(0)'

    },
    error: {
      borderColor: errorStyleColor || errorColor,
      transform: 'scaleX(1)'
    }
  };

  var underline = Object.assign({}, styles.root, style);
  var focusedUnderline = Object.assign({}, underline, styles.focus, focusStyle);

  if (disabled) underline = Object.assign({}, underline, styles.disabled, disabledStyle);
  if (focus) focusedUnderline = Object.assign({}, focusedUnderline, { transform: 'scaleX(1)' });
  if (errorText) focusedUnderline = Object.assign({}, focusedUnderline, styles.error);

  return {
    underline: underline,
    focusedUnderline: focusedUnderline
  };
}));

var injectErrorStyles = exports.injectErrorStyles = (0, _compose2.default)((0, _styles.withStyles)(function (_ref8, _ref9) {
  var errorColor = _ref8.textField.errorColor;
  var errorText = _ref9.errorText;
  return {
    position: 'relative',
    bottom: -8,
    fontSize: errorFontSize,
    fontWeight: 400,
    lineHeight: errorFontSize + 'px',
    color: errorColor,
    transition: 'transform 450ms ease-out',
    transform: 'scaleY(' + (errorText ? 1 : 0) + ')'
  };
}));