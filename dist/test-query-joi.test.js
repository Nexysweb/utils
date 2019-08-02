"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("joi"));

var _testQueryJoi = require("./test-query-joi");

test('simple query test', function () {
  var j = {
    PlanParticipant: {
      params: {},
      projection: {},
      filters: {
        plan: {
          id: 45
        }
      }
    },
    Partner: {
      projection: {}
    }
  };
  expect((0, _testQueryJoi.isCrud)(j)).toEqual(true);
});
test('simple query test - fail (`filters` is misspelt)', function () {
  var j = {
    PlanParticipant: {
      params: {},
      projection: {},
      filter: {
        plan: {
          id: 45
        }
      }
    },
    Partner: {
      projections: {}
    }
  };
  expect((0, _testQueryJoi.isCrud)(j)).toEqual(false);
});
var ddl = [{
  name: 'Test',
  params: [{
    arg: 'name',
    type: 'String',
    optional: false
  }, {
    arg: 'age',
    type: 'Int',
    optional: false
  }]
}];
test('is schema', function () {
  var j = {
    Test: {
      params: {},
      projection: {},
      filter: {}
    }
  };
  expect((0, _testQueryJoi.isSchema)(j, ddl)).toEqual(true);
});
test('is not schema - entity misspelt', function () {
  var j = {
    Tesst: {
      params: {},
      projection: {},
      filter: {}
    }
  };
  expect((0, _testQueryJoi.isSchema)(j, ddl)).toEqual(false);
});