'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = createComponent;

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createComponent(MaterialUIComponent, mapProps) {
  var InputComponent = function (_Component) {
    (0, _inherits3.default)(InputComponent, _Component);

    function InputComponent() {
      (0, _classCallCheck3.default)(this, InputComponent);
      return (0, _possibleConstructorReturn3.default)(this, (InputComponent.__proto__ || Object.getPrototypeOf(InputComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(InputComponent, [{
      key: 'getRenderedComponent',
      value: function getRenderedComponent() {
        return this.refs.component;
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _react.createElement)(MaterialUIComponent, (0, _extends3.default)({}, mapProps(this.props), {
          ref: 'component'
        }));
      }
    }]);
    return InputComponent;
  }(_react.Component);

  InputComponent.displayName = 'ReduxFormMaterialUI' + MaterialUIComponent.name;
  return InputComponent;
}