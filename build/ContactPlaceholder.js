"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ui = require("@yosmy/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ContactPlaceholder = function ContactPlaceholder() {
  return /*#__PURE__*/_react["default"].createElement(_ui.Container, {
    flow: "row",
    align: {
      self: "stretch",
      main: "flex-start",
      cross: "center"
    },
    margin: {
      top: 0,
      bottom: 2
    },
    padding: {
      top: 0,
      bottom: 2,
      left: 2,
      right: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_ui.CirclePlaceholder, {
    size: 35
  }), /*#__PURE__*/_react["default"].createElement(_ui.Container, {
    margin: {
      left: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_ui.LinePlaceholder, {
    width: 120
  }), /*#__PURE__*/_react["default"].createElement(_ui.LinePlaceholder, {
    width: 80,
    margin: {
      top: 1
    }
  })));
};

var _default = ContactPlaceholder;
exports["default"] = _default;