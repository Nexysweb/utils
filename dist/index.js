"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _string = require("./string");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @param k1=v1,k2=v2, ...
 * @return { k1: v1, k2: v2 .. }
 */
var deserialize = function deserialize(str) {
  return str.split(',').reduce(function (r, item) {
    var arr = item.split('=');

    if (arr.length === 2) {
      var _arr = (0, _slicedToArray2["default"])(arr, 2),
          key = _arr[0],
          value = _arr[1];

      return _objectSpread({}, r, (0, _defineProperty2["default"])({}, key, value));
    } else return r;
  }, {});
};

var get = function get(p, o) {
  return p.split(".").reduce(function (xs, x) {
    if (xs && xs[x]) return xs[x];else return null;
  }, o);
};

var groupBy = function groupBy(arr, key) {
  var callback = function callback(acc, v) {
    // dummy variable that is the value of the key
    var k = get(key, v);
    (acc[k] = acc[k] || []).push(v);
    return acc;
  };

  return arr.reduce(callback, {});
};

var unique = function unique(arr, prop) {
  var temp = arr.map(function (obj) {
    return prop ? get(prop, obj) : obj;
  });
  return arr.filter(function (obj, i) {
    return temp.indexOf(prop ? get(prop, obj) : obj) == i;
  });
};

var formatDate = function formatDate(date) {
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var month = monthIndex + 1;
  return (0, _string.padding)(day, 2) + '.' + (0, _string.padding)(month, 2) + '.' + (0, _string.padding)(year, 4);
};

var paramsToString = function paramsToString(params) {
  return Object.keys(params).map(function (key) {
    return key + '=' + encodeURIComponent(params[key]);
  }).join('&');
};

var parseEnvVar = function parseEnvVar() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var end = value.length - 1;
  var isDoubleQuoted = value[0] === '"' && value[end] === '"';
  var isSingleQuoted = value[0] === "'" && value[end] === "'"; // if single or double quoted, remove quotes

  if (isSingleQuoted || isDoubleQuoted) {
    value = value.substring(1, end); // if double quoted, expand newlines

    if (isDoubleQuoted) {
      var RE_NEWLINES = /\\n/g;
      var NEWLINE = '\n';
      value = value.replace(RE_NEWLINES, NEWLINE);
    }
  } else {
    // remove surrounding whitespace
    value = value.trim();
  }

  return value;
};

var _default = {
  get: get,
  groupBy: groupBy,
  unique: unique,
  padding: _string.padding,
  formatDate: formatDate,
  deserialize: deserialize,
  paramsToString: paramsToString,
  parseEnvVar: parseEnvVar
};
exports["default"] = _default;