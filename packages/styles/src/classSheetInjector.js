'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _react = require('react');

var _lodash = require('lodash');

var _reactJss = require('react-jss');

var _recompose = require('recompose');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var classSheetInjector = function classSheetInjector() {
  var classesName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'classes';
  return function (BaseComponent) {
    var classSheet = void 0;
    var instanceCount = 0;
    var updateId = 0;

    return function (_Component) {
      (0, _inherits3.default)(_class2, _Component);

      function _class2(props) {
        (0, _classCallCheck3.default)(this, _class2);

        var _this = (0, _possibleConstructorReturn3.default)(this, (_class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call(this, props));

        _this.classUpdateId = 0;

        if (instanceCount === 0) {
          _this.attachSheet(props.themeStyles);
        }
        instanceCount += 1;
        return _this;
      }

      (0, _createClass3.default)(_class2, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
          if (!(0, _lodash.isEqual)(this.props.themeStyles, nextProps.themeStyles)) {
            if (this.classUpdateId === updateId) {
              this.detachSheet();
              this.attachSheet(nextProps.themeStyles);
              updateId += 1;
            }
            this.classUpdateId = updateId;
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          instanceCount -= 1;
          if (instanceCount === 0) {
            this.detachSheet();
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props,
              _ = _props.themeStyles,
              rest = (0, _objectWithoutProperties3.default)(_props, ['themeStyles']); // eslint-disable-line no-unused-vars

          var _classSheet = classSheet,
              classes = _classSheet.classes;

          return (0, _recompose.createEagerElement)(BaseComponent, (0, _extends4.default)((0, _defineProperty3.default)({}, classesName, classes), rest));
        }
      }, {
        key: 'attachSheet',
        value: function attachSheet(themeStyles) {
          classSheet = _reactJss.jss.createStyleSheet(themeStyles, {
            link: true,
            meta: (0, _recompose.getDisplayName)(BaseComponent) + '-classSheet'

          }).attach();
        }
      }, {
        key: 'detachSheet',
        value: function detachSheet() {
          _reactJss.jss.removeStyleSheet(classSheet);
          classSheet = undefined;
        }
      }]);
      return _class2;
    }(_react.Component);
  };
};

exports.default = classSheetInjector;