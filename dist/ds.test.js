"use strict";

var _ds = require("./ds");

test('transpose', function () {
  var a = {
    a: {
      c: 'my ac',
      d: 'my ad'
    },
    b: {
      c: 'my bc',
      d: 'my bd'
    }
  };
  var r = (0, _ds.transpose)(a);
  var e = {
    c: {
      a: 'my ac',
      b: 'my bc'
    },
    d: {
      a: 'my ad',
      b: 'my bd'
    }
  };
  expect(r).toEqual(e);
});
test('transpose with fn', function () {
  var a = {
    a: {
      c: 11,
      d: 12
    },
    b: {
      c: 21,
      d: 22
    }
  };
  var r = (0, _ds.transpose)(a, function (x) {
    return x + 100;
  });
  var e = {
    c: {
      a: 111,
      b: 121
    },
    d: {
      a: 112,
      b: 122
    }
  };
  expect(r).toEqual(e);
});
test('distinct', function () {
  var a = [1, 2, 3, 2, 1, 1, 1];
  var r = (0, _ds.distinct)(a);
  var e = [1, 2, 3];
  expect(r).toEqual(e);
});
/* does not work with objevts 
test('distinct with objects', () => {
  const a = [{name: 'elephant'}, {name: 'lion'}, {name: 'elephant'}, {name: 'leopard'}, {name: 'elephant'}, {name: 'wilderbeest'}, {name: 'rhinoceros'}];
  const r = distinct(a);
  const e = [{name: 'elephant'}, {name: 'lion'}, {name: 'leopard'} ,{name: 'wilderbeest'}, {name: 'rhinoceros'}];
  expect(r).toEqual(e);
});
*/