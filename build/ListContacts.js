"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _collect = _interopRequireDefault(require("./collect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ListContacts = (0, _react.memo)(function (_ref) {
  var ui = _ref.ui,
      country = _ref.country,
      initialCriteria = _ref.criteria,
      onEnrich = _ref.onEnrich;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      chunks = _useState2[0],
      setChunks = _useState2[1];

  var _useState3 = (0, _react.useState)({
    skip: 0,
    limit: initialCriteria.limit
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      criteria = _useState4[0],
      setCriteria = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      more = _useState6[0],
      setMore = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      error = _useState8[0],
      setError = _useState8[1];

  (0, _react.useEffect)(function () {
    if (chunks === null) {
      return;
    }

    setChunks(null);
    setCriteria({
      skip: 0,
      limit: initialCriteria.limit
    });
    setMore(true);
  }, [initialCriteria]);
  (0, _react.useEffect)(function () {
    (0, _collect["default"])(country, {
      country: initialCriteria.country,
      text: initialCriteria.text,
      skip: criteria.skip,
      limit: criteria.limit
    }).then(function (contacts) {
      setChunks(function (prev) {
        if (prev === null) {
          prev = [];
        }

        return prev.concat( /*#__PURE__*/_react["default"].createElement(ShowChunk, {
          key: prev.length + 1,
          ui: {
            layout: _react["default"].Fragment,
            item: ui.item
          },
          items: contacts,
          onEnrich: onEnrich
        }));
      });

      if (contacts.length === 0) {
        setMore(false);
      }
    })["catch"](function () {
      setError(true);
    });
  }, [criteria]);

  if (chunks === null) {
    return /*#__PURE__*/_react["default"].createElement(ui.layout, null, /*#__PURE__*/_react["default"].createElement(ui.loading, null));
  }

  if (error) {
    return /*#__PURE__*/_react["default"].createElement(ui.layout, null, /*#__PURE__*/_react["default"].createElement(ui.error, null));
  }

  return /*#__PURE__*/_react["default"].createElement(ui.layout, null, chunks, more && /*#__PURE__*/_react["default"].createElement(ui.more, {
    onClick: function onClick() {
      setCriteria(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          skip: prev.skip + prev.limit
        });
      });
    }
  }));
}, function (prev, next) {
  return prev.criteria === next.criteria;
});
ListContacts.propTypes = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired,
    loading: _propTypes["default"].func.isRequired,
    item: _propTypes["default"].func.isRequired,
    more: _propTypes["default"].func.isRequired,
    empty: _propTypes["default"].func.isRequired,
    none: _propTypes["default"].func.isRequired
  }).isRequired,
  country: _propTypes["default"].string.isRequired,
  // The country context
  criteria: _propTypes["default"].shape({
    country: _propTypes["default"].string,
    text: _propTypes["default"].string,
    limit: _propTypes["default"].number.isRequired
  }).isRequired,
  onEnrich: _propTypes["default"].func.isRequired
};

var ShowChunk = function ShowChunk(_ref2) {
  var ui = _ref2.ui,
      initialItems = _ref2.items,
      onEnrich = _ref2.onEnrich;

  var _useState9 = (0, _react.useState)(initialItems),
      _useState10 = _slicedToArray(_useState9, 2),
      items = _useState10[0],
      setItems = _useState10[1];

  (0, _react.useEffect)(function () {
    onEnrich(items).then(function (items) {
      setItems(items);
    });
  }, []);

  if (items.length === 0) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(ui.layout, null, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(ui.item, _extends({}, item, {
      key: "".concat(item.prefix, "-").concat(item.number)
    }));
  }));
};

var _default = ListContacts;
exports["default"] = _default;