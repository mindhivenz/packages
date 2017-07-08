'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _di = require('@mindhive/di');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var copyProps = function copyProps(themeDomain) {
  return {
    theme: themeDomain.muiTheme,
    prepareStyles: themeDomain.prepareStyles
  };
};

exports.default = function (mapThemeToStyles) {

  if (!mapThemeToStyles) {
    return function (Component) {
      var themedComponent = (0, _mobxReact.observer)(function (props) {
        return _react2.default.createElement(Component, (0, _extends3.default)({}, props, copyProps((0, _di.app)().themeDomain)));
      });
      themedComponent.displayName = 'withStyles';
      return themedComponent;
    };
  }

  var mapFuncUsesProps = mapThemeToStyles.length > 1;
  if (mapFuncUsesProps) {
    return function (Component) {
      var _desc, _value, _class, _class2, _temp;

      return (0, _mobxReact.observer)((_class = (_temp = _class2 = function (_React$Component) {
        (0, _inherits3.default)(_class, _React$Component);

        function _class() {
          (0, _classCallCheck3.default)(this, _class);
          return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
        }

        (0, _createClass3.default)(_class, [{
          key: 'render',
          value: function render() {
            return _react2.default.createElement(Component, (0, _extends3.default)({}, this.props, this.themeProps));
          }
        }, {
          key: 'themeProps',
          get: function get() {
            var _app = (0, _di.app)(),
                themeDomain = _app.themeDomain;

            return (0, _extends3.default)({}, copyProps(themeDomain), {
              styles: mapThemeToStyles(themeDomain.muiTheme, this.props)
            });
          }
        }]);
        return _class;
      }(_react2.default.Component), _class2.displayName = 'withStyles(props)', _temp), _applyDecoratedDescriptor(_class.prototype, 'themeProps', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'themeProps'), _class.prototype), _class));
    };
  }

  var cache = (0, _mobx.observable)({
    get themeProps() {
      var _app2 = (0, _di.app)(),
          themeDomain = _app2.themeDomain;

      return (0, _extends3.default)({}, copyProps(themeDomain), {
        styles: mapThemeToStyles(themeDomain.muiTheme)
      });
    }
  });
  return function (Component) {
    var themedComponent = (0, _mobxReact.observer)(function (props) {
      return _react2.default.createElement(Component, (0, _extends3.default)({}, props, cache.themeProps));
    });
    themedComponent.displayName = 'withStyles';
    return themedComponent;
  };
};