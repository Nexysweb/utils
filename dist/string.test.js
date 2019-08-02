"use strict";

var _string = require("./string");

test('padding', function () {
  var e = '00034';
  var m = '34';
  var width = 5;
  var z = '0';
  expect((0, _string.padding)(m, width, z)).toEqual(e);
});
test('contains', function () {
  expect((0, _string.contains)('string', 'str')).toEqual(true);
});
test('parse name', function () {
  expect((0, _string.parseName)('[0].lesson')).toEqual({
    i: "0",
    key: 'lesson'
  });
  expect((0, _string.parseName)('[1].owner')).toEqual({
    i: "1",
    key: 'owner'
  });
});
test('capitalize', function () {
  expect((0, _string.capitalize)('lesson')).toEqual('Lesson');
});
test('readableFileSize', function () {
  expect((0, _string.readableFileSize)(568749)).toEqual('555.42 KB');
});