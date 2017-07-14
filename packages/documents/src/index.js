'use strict';

var _package = require('../package.json');

var _DocAddFab = require('./DocAddFab');

var _DocAddFab2 = _interopRequireDefault(_DocAddFab);

var _DocContainer = require('./DocContainer');

var _DocContainer2 = _interopRequireDefault(_DocContainer);

var _NoDocsLabel = require('./NoDocsLabel');

var _NoDocsLabel2 = _interopRequireDefault(_NoDocsLabel);

var _DocList = require('./DocList');

var _DocList2 = _interopRequireDefault(_DocList);

var _DocListIcon = require('./DocListIcon');

var _DocListIcon2 = _interopRequireDefault(_DocListIcon);

var _DocEdit = require('./DocEdit');

var _DocEdit2 = _interopRequireDefault(_DocEdit);

var _DocView = require('./DocView');

var _DocView2 = _interopRequireDefault(_DocView);

var _DocDropDownMenu = require('./DocDropDownMenu');

var _DocDropDownMenu2 = _interopRequireDefault(_DocDropDownMenu);

var _DocStatefulIcon = require('./DocStatefulIcon');

var _DocStatefulIcon2 = _interopRequireDefault(_DocStatefulIcon);

var _withDocEditContext = require('./withDocEditContext');

var _withDocEditContext2 = _interopRequireDefault(_withDocEditContext);

var _withDocEditContextAsProps = require('./withDocEditContextAsProps');

var _withDocEditContextAsProps2 = _interopRequireDefault(_withDocEditContextAsProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  DocAddFab: _DocAddFab2.default,
  DocContainer: _DocContainer2.default,
  NoDocsLabel: _NoDocsLabel2.default,
  DocList: _DocList2.default,
  DocListIcon: _DocListIcon2.default,
  DocEdit: _DocEdit2.default,
  DocView: _DocView2.default,
  DocStatefulIcon: _DocStatefulIcon2.default,
  DocDropDownMenu: _DocDropDownMenu2.default,
  withDocEditContext: _withDocEditContext2.default,
  withDocEditContextAsProps: _withDocEditContextAsProps2.default,
  getVersion: function getVersion() {
    return _package.version;
  }
};