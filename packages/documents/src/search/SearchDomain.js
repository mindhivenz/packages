'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class, _descriptor, _descriptor2;

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var SearchDomain = (_class = function () {
  function SearchDomain() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var retrievers = arguments[1];
    (0, _classCallCheck3.default)(this, SearchDomain);

    _initDefineProp(this, 'searchText', _descriptor, this);

    _initDefineProp(this, 'onSearch', _descriptor2, this);

    this.items = items;
    this.retrievers = retrievers;
  }

  (0, _createClass3.default)(SearchDomain, [{
    key: 'itemsTexts',
    get: function get() {
      var _this = this;

      return this.items.map(function (item) {
        return _this.retrievers.map(function (r) {
          return r(item);
        }).filter(function (t) {
          return t;
        }).map(function (t) {
          return t.toLowerCase();
        });
      });
    }
  }, {
    key: 'results',
    get: function get() {
      var _this2 = this;

      if (!this.searchText) {
        return this.items;
      }
      var searchText = this.searchText.toLowerCase();
      return this.items.filter(function (item, i) {
        return _this2.itemsTexts[i].some(function (itemText) {
          return itemText.includes(searchText);
        });
      });
    }
  }]);
  return SearchDomain;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'searchText', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'onSearch', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (searchText) {
      _this3.searchText = searchText;
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, 'itemsTexts', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'itemsTexts'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'results', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'results'), _class.prototype)), _class);
exports.default = SearchDomain;