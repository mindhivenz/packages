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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapError = function mapError(_ref) {
  var errorProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'errorText';
  var _ref$meta = _ref.meta;
  _ref$meta = _ref$meta === undefined ? {} : _ref$meta;
  var touched = _ref$meta.touched,
      error = _ref$meta.error,
      warning = _ref$meta.warning,
      inputProps = (0, _objectWithoutProperties3.default)(_ref.input, []),
      props = (0, _objectWithoutProperties3.default)(_ref, ['meta', 'input']);
  return touched && (error || warning) ? (0, _extends4.default)({}, props, inputProps, (0, _defineProperty3.default)({}, errorProp, error || warning)) : (0, _extends4.default)({}, inputProps, props);
};

exports.default = mapError;