"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isError = exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

/**
 * error class to manage exceptions at service level
 */
var Error = function Error(message, statusCode) {
  (0, _classCallCheck2["default"])(this, Error);
  this.message = message || null;
  this.statusCode = statusCode || 400;
  this.isError = true;
};
/**
 * check whether of type error
 * @param any  input
 * @return boolean
 */


exports["default"] = Error;

var isError = function isError(e) {
  return e instanceof Error;
};

exports.isError = isError;