"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DefaultComponent = function DefaultComponent(_ref) {
  var passRef = _ref.passRef,
      hidden = _ref.hidden,
      onChange = _ref.onChange;
  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    ref: passRef,
    onChange: onChange,
    style: hidden ? {
      display: "none"
    } : {}
  });
};

var ImageInput = function ImageInput(_ref2) {
  var InputComponent = _ref2.InputComponent,
      className = _ref2.className,
      handleChange = _ref2.handleChange,
      fileName = _ref2.fileName,
      imageUrl = _ref2.imageUrl,
      inputRef = _ref2.inputRef,
      showInputWindow = _ref2.showInputWindow,
      handleImageDelete = _ref2.handleImageDelete;

  var Component = /*#__PURE__*/_react["default"].memo(function () {
    if (InputComponent) {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(DefaultComponent, {
        hidden: true,
        passRef: inputRef,
        onChange: handleChange
      }), /*#__PURE__*/_react["default"].createElement(InputComponent, {
        fileName: fileName,
        src: imageUrl,
        onClick: showInputWindow,
        onDelete: handleImageDelete
      }));
    }

    return /*#__PURE__*/_react["default"].createElement(DefaultComponent, {
      passRef: inputRef,
      onChange: handleChange
    });
  });

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className
  }, /*#__PURE__*/_react["default"].createElement(Component, null));
};

var _default = ImageInput;
exports["default"] = _default;