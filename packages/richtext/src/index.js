'use strict';

var _package = require('../package.json');

var _TextEditor = require('./reduxForm/TextEditor');

var _TextEditor2 = _interopRequireDefault(_TextEditor);

var _TextView = require('./TextView');

var _TextView2 = _interopRequireDefault(_TextView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-unresolved
module.exports = {
  TextEditor: _TextEditor2.default,
  TextView: _TextView2.default,
  getVersion: function getVersion() {
    return _package.version;
  }

};