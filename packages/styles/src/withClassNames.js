'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _withProps = require('recompose/withProps');

var _withProps2 = _interopRequireDefault(_withProps);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _fromPairs = require('lodash/fromPairs');

var _fromPairs2 = _interopRequireDefault(_fromPairs);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (propsMapper) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$propName = _ref.propName,
      propName = _ref$propName === undefined ? 'classNames' : _ref$propName,
      log = _ref.log;

  return (0, _withProps2.default)(function (props) {
    var result = void 0;
    var classNames = propsMapper(props);
    if (typeof classNames === 'string') {
      result = classNames;
    } else if (Object.prototype.toString.call(classNames) === '[object Array]') {
      result = (0, _classnames2.default)(classNames);
    } else if ((typeof classNames === 'undefined' ? 'undefined' : (0, _typeof3.default)(classNames)) === 'object') {
      result = (0, _fromPairs2.default)((0, _keys2.default)(classNames).map(function (key) {
        return [key, (0, _classnames2.default)(classNames[key])];
      }));
    } else {
      console.warn('Unhandled classNames type returned: ' + (typeof classNames === 'undefined' ? 'undefined' : (0, _typeof3.default)(classNames)), classNames);
    }
    if (log) console.log(result);
    return result ? (0, _defineProperty3.default)({}, propName, result) : undefined;
  });
};