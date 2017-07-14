'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omit = require('lodash/fp/omit');

var _omit2 = _interopRequireDefault(_omit);

var _mapProps = require('recompose/mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (keys) {
  return (0, _mapProps2.default)(function (props) {
    return (0, _omit2.default)(keys, props);
  });
};