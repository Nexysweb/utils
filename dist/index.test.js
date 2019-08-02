"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

var get = _index["default"].get,
    groupBy = _index["default"].groupBy,
    padding = _index["default"].padding,
    unique = _index["default"].unique,
    formatDate = _index["default"].formatDate,
    deserialize = _index["default"].deserialize,
    paramsToString = _index["default"].paramsToString,
    parseEnvVar = _index["default"].parseEnvVar;
test('deserialize', function () {
  var value = 'k1=v1,k2=v2';
  var e = {
    'k2': 'v2',
    'k1': 'v1'
  };
  expect(deserialize(value)).toEqual(e);
});
test('group by', function () {
  var value = [{
    a: 'first',
    v: 4
  }, {
    a: 'first',
    v: 2
  }, {
    a: 'second',
    v: 1
  }, {
    a: 'second',
    v: 5
  }];
  var e = {
    'first': [{
      a: 'first',
      v: 4
    }, {
      a: 'first',
      v: 2
    }],
    'second': [{
      a: 'second',
      v: 1
    }, {
      a: 'second',
      v: 5
    }]
  };
  expect(groupBy(value, 'a')).toEqual(e);
});
test('paramsToString', function () {
  var params = {
    a: 'fd',
    b: 23
  };
  var e = 'a=fd&b=23';
  expect(paramsToString(params)).toEqual(e);
});
test('padding', function () {
  var e = '00034';
  var m = '34';
  var width = 5;
  var z = '0';
  expect(padding(m, width, z)).toEqual(e);
});
test('formatDate', function () {
  var d = new Date('2019-09-04');
  expect(formatDate(d)).toEqual('04.09.2019');
});
test('parseEnvVar', function () {
  var value = 'fd="gfds"';
  var e = 'fd="gfds"';
  expect(parseEnvVar(value)).toEqual(e);
});
test('get', function () {
  var p = "country.id";
  var data = {
    country: {
      id: 4
    }
  };
  expect(get(p, data)).toEqual(4);
});
test('unique', function () {
  var rows = [{
    ModuleId: 3
  }, {
    ModuleId: 1
  }, {
    ModuleId: 2
  }, {
    ModuleId: 3
  }];
  var r = unique(rows.map(function (e) {
    return e.ModuleId;
  }));
  expect(r).toEqual([3, 1, 2]);
});