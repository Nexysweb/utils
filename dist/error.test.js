"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _error = _interopRequireWildcard(require("./error"));

var message = 'something went wrong';
var statusCode = 500;
var myError = new _error["default"](message, statusCode);
test('check if input is an error', function () {
  var ARandomClass = function ARandomClass() {
    (0, _classCallCheck2["default"])(this, ARandomClass);
  };

  ;
  var myRandomClass = new ARandomClass(); // typof always returns `object`
  // console.log(typeof e)

  expect(myError instanceof _error["default"]).toEqual(true);
  expect('mystring' instanceof _error["default"]).toEqual(false);
  expect(myRandomClass instanceof _error["default"]).toEqual(false);
  expect((0, _error.isError)(myError)).toEqual(true);
  expect((0, _error.isError)(myRandomClass)).toEqual(false);
  expect((0, _error.isError)('myString')).toEqual(false);
  console.log(myError.message);
});
test('iserror attribute works', function () {
  expect(myError.isError).toEqual(true);
});
test('attributes are being saved', function () {
  expect(myError.message).toEqual(message);
  expect(myError.statusCode).toEqual(statusCode);
});
test('default atttributes', function () {
  var defaultError = new _error["default"]();
  expect(defaultError.message).toEqual(null);
  expect(defaultError.statusCode).toEqual(400);
});