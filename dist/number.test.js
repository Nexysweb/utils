"use strict";

var _number = require("./number");

test('format', function () {
  expect((0, _number.formatNumber)(23.1234)).toEqual('23.12');
});
test('format mini', function () {
  expect((0, _number.formatNumberMini)(23.1234)).toEqual('23.12');
});
test('formatKprice', function () {
  expect((0, _number.formatKprice)(5423.1234)).toEqual('5,423');
});
test('sum', function () {
  // sum n = n(n+1)/2
  expect((0, _number.sum)([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(9 * 10 / 2);
});
test('isNumeric', function () {
  expect((0, _number.isNumeric)(34)).toEqual(true);
  expect((0, _number.isNumeric)('34')).toEqual(true);
  expect((0, _number.isNumeric)(null)).toEqual(false);
  expect((0, _number.isNumeric)('null')).toEqual(false);
});
test('calcRatio', function () {
  expect((0, _number.calcRatio)(6, 10)).toEqual('60.00');
});
test('tofloat', function () {
  expect((0, _number.toFloat)('23.43')).toEqual(23.43);
});