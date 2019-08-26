"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transpose = exports.distinct = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

/**
 * @see https://codeburst.io/javascript-array-distinct-5edc93501dc4
 * @return only distinct entries in an array 
 */
var distinct = function distinct(arr) {
  return (0, _toConsumableArray2["default"])(new Set(arr));
};
/**
 * transposes an object in the mathematical terms; i.e. rows become columns and columns become rows.
 * Note: the cardinality of the two outer and inner objects must be the same
 * @param  arr: the object that will be transposed
 * @param  fn  function that maps the value that is transposed to a potential other value. By default returns same value
 * @return transposed object
 */


exports.distinct = distinct;

var transpose = function transpose(arr) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a) {
    return a;
  };
  var r = {};
  Object.keys(arr).map(function (idx) {
    return Object.keys(arr[idx]).map(function (d) {
      if (!r[d]) {
        r[d] = {};
      }

      r[d][idx] = fn(arr[idx][d]);
      return true;
    });
  });
  return r;
};

exports.transpose = transpose;