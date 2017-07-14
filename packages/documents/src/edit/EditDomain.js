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

var EditDomain = (_class = function () {
  function EditDomain() {
    var _this = this;

    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var retrievers = arguments[1];
    (0, _classCallCheck3.default)(this, EditDomain);
    this.animationOut = 100;

    this.onCancel = function () {};

    this.lastFocusId = 'DOC_EDIT_LAST_FOCUS';
    this.firstFocusId = 'DOC_EDIT_FIRST_FOCUS';
    this.listItem = undefined;

    _initDefineProp(this, '_wantShow', _descriptor, this);

    _initDefineProp(this, 'handleClose', _descriptor2, this);

    this.discardChanges = function () {
      _this.handleClose(_this.onCancel);
    };

    this.submitChanges = function (e) {
      e.preventDefault();
      _this.handleSubmit(_this.fields);
    };

    this.registerFirstFocus = function (node) {
      if (_this.firstFocusable === undefined) {
        _this.firstFocusable = node;
      }
    };

    this.registerListItem = function (node) {
      if (_this.listItem === undefined) {
        _this.listItem = node;
      }
    };

    this.focusForward = function (e) {
      if (e.target.id === _this.lastFocusId) {
        e.preventDefault();
        _this.firstFocusable.getRenderedComponent().refs.component.input.focus();
      }
    };

    this.keyMap = {
      'focusForward': 'tab',
      'submitChanges': ['command+enter', 'ctrl+enter'],
      'discardChanges': 'esc'
    };
    this.handlers = {
      'focusForward': this.focusForward,
      'submitChanges': this.submitChanges,
      'discardChanges': this.discardChanges,
      'enter': function enter() {}
    };

    this.items = items;
    this.retrievers = retrievers;
  }

  (0, _createClass3.default)(EditDomain, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleOpen();
      this.handleScroll();
      // setTimeout(() => this.handleOpen(), 0)
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimeout);
      clearTimeout(this.leaveTimeout);
    }
  }, {
    key: 'setShow',
    value: function setShow(show) {
      this._wantShow = show;
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var onCancel = _ref.onCancel,
          handleSubmit = _ref.handleSubmit,
          fields = _ref.fields,
          scrollNew = _ref.scrollNew;

      this.handleSubmit = handleSubmit;
      this.fields = fields;
      this.scrollNew = scrollNew;
      // console.log('SubMenu.update', menuItems)
      this.onCancel = onCancel;
      // console.log('after update', this.menuItems)
    }
  }, {
    key: 'handleOpen',
    value: function handleOpen() {
      this.setShow(true);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      // console.log('this.scrollNew', this.scrollNew)
      if (this.listItem && this.scrollNew) {
        // console.log('Scroll', this.listItem.button.button.parentElement.parentElement.parentElement)
        this.listItem.button.button.parentElement.parentElement.parentElement.scrollIntoView(true);
      }
    }
  }, {
    key: 'show',
    get: function get() {
      return this._wantShow;
    }
  }]);
  return EditDomain;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, '_wantShow', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'show', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'show'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setShow', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setShow'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'update', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'update'), _class.prototype), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'handleClose', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (callback) {
      _this2.setShow(false);
      _this2.leaveTimeout = setTimeout(function () {
        _this2.leaveTimeout = null;
        callback();
      }, _this2.animationOut); // matches transition duration
    };
  }
})), _class);
exports.default = EditDomain;