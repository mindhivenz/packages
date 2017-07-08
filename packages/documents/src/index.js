'use strict';

var _package = require('../package.json');

var _applyTheme = require('./applyTheme');

var _applyTheme2 = _interopRequireDefault(_applyTheme);

var _withStyles = require('./withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _withClassNames = require('./withClassNames');

var _withClassNames2 = _interopRequireDefault(_withClassNames);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = {
  applyTheme: _applyTheme2.default,
  withStyles: _withStyles2.default,
  withClassNames: _withClassNames2.default,
  getVersion: function getVersion() {
    return _package.version;
  }
};