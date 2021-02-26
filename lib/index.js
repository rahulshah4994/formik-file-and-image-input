"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageInput = exports.FileInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _component = _interopRequireDefault(require("./formik-file-input/component"));

var _component2 = _interopRequireDefault(require("./formik-image-input/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FileInput = function FileInput(_ref) {
  var Component = _ref.component,
      className = _ref.className,
      validFormats = _ref.validFormats,
      name = _ref.name,
      hideName = _ref.hideName,
      hideError = _ref.hideError,
      hideDelete = _ref.hideDelete;

  var _useFormikContext = (0, _formik.useFormikContext)(),
      values = _useFormikContext.values,
      errors = _useFormikContext.errors,
      touched = _useFormikContext.touched,
      setFieldValue = _useFormikContext.setFieldValue,
      setFieldTouched = _useFormikContext.setFieldTouched,
      setFieldError = _useFormikContext.setFieldError;

  var isFileValid = (0, _react.useCallback)(function (file) {
    if (!validFormats.includes(file.type)) {
      setFieldValue(name, null);
      setTimeout(function () {
        setFieldError(name, "Invalid file format. Accepted formats are ".concat(validFormats.join(", ")));
      }, 0);
      return false;
    }

    return true;
  }, [validFormats]);

  var handleFileUpload = function handleFileUpload(e) {
    var file = e.target.files[0];
    setFieldTouched(name, true);

    if (isFileValid(file)) {
      setFieldValue(name, file);
      setFieldError(name, null);
    }
  };

  var handleFileDelete = (0, _react.useCallback)(function () {
    setFieldValue(name, null);
    setFieldError(name, null);
  }, []);
  var fileInputProps = {
    InputComponent: Component,
    className: className,
    handleChange: handleFileUpload,
    fileName: values[name] && values[name].name
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_component["default"], fileInputProps), !hideName && /*#__PURE__*/_react["default"].createElement("p", null, values[name] && values[name].name), !hideError && touched[name] && /*#__PURE__*/_react["default"].createElement("p", null, errors[name]), !hideDelete && /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleFileDelete
  }, "Delete"));
};

exports.FileInput = FileInput;
var universalImageFormats = ["image/png", "image/svg+xml", "image/jpeg", "image/gif", "image/bmp", "image/tiff", "image/webp"];

var ImageInput = function ImageInput(_ref2) {
  var Component = _ref2.component,
      className = _ref2.className,
      _ref2$validFormats = _ref2.validFormats,
      validFormats = _ref2$validFormats === void 0 ? universalImageFormats : _ref2$validFormats,
      name = _ref2.name,
      hideName = _ref2.hideName,
      hideError = _ref2.hideError,
      hideDelete = _ref2.hideDelete,
      hideEdit = _ref2.hideEdit;

  var _useFormikContext2 = (0, _formik.useFormikContext)(),
      values = _useFormikContext2.values,
      errors = _useFormikContext2.errors,
      touched = _useFormikContext2.touched,
      setFieldValue = _useFormikContext2.setFieldValue,
      setFieldTouched = _useFormikContext2.setFieldTouched,
      setFieldError = _useFormikContext2.setFieldError;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      imageUrl = _useState2[0],
      setImageUrl = _useState2[1];

  var inputRef = (0, _react.useRef)(null);
  var isFileValid = (0, _react.useCallback)(function (file) {
    if (!validFormats.includes(file.type)) {
      setFieldValue(name, null);
      setTimeout(function () {
        setFieldError(name, "Invalid file format. Accepted formats are ".concat(validFormats.join(", ")));
      }, 0);
      return false;
    }

    return true;
  }, [validFormats]);

  var generateImageUrl = function generateImageUrl(image) {
    var reader = new FileReader();

    reader.onload = function (e) {
      setImageUrl(e.target.result);
    };

    reader.readAsDataURL(image);
  };

  var handleImageUpload = function handleImageUpload(e) {
    var image = e.target.files[0];
    setFieldTouched(name, true);

    if (isFileValid(image)) {
      setFieldValue(name, image);
      setFieldError(name, null);
      generateImageUrl(image);
    }
  };

  var handleImageDelete = (0, _react.useCallback)(function () {
    setFieldValue(name, null);
    setFieldError(name, null);
    setImageUrl(null);
  }, []);
  var showInputWindow = (0, _react.useCallback)(function (e) {
    inputRef.current.click();
    e.stopPropagation();
  }, [inputRef]);
  var imageInputProps = {
    InputComponent: Component,
    className: className,
    handleChange: handleImageUpload,
    fileName: values[name] && values[name].name,
    showInputWindow: showInputWindow,
    inputRef: inputRef,
    imageUrl: imageUrl,
    handleImageDelete: handleImageDelete
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_component2["default"], imageInputProps), !hideName && /*#__PURE__*/_react["default"].createElement("p", null, values[name] && values[name].name), !hideError && touched[name] && /*#__PURE__*/_react["default"].createElement("p", null, errors[name]), !hideEdit && /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleImageEdit
  }, "Edit"), !hideDelete && /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleImageDelete
  }, "Delete"));
};

exports.ImageInput = ImageInput;