'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapError = require('./mapError');

var _mapError2 = _interopRequireDefault(_mapError);

var _createComponent = require('./createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _TextEditor = require('../TextEditor');

var _TextEditor2 = _interopRequireDefault(_TextEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createComponent2.default)(_TextEditor2.default, _mapError2.default);