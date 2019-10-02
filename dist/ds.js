"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareObj = exports.sortByProp = exports.removePrefix = exports.isEmpty = exports.updateObject = exports.set = exports.get = exports.removeProps = exports.removeProp = exports.deserialize = exports.unique = exports.groupBy = exports.transpose = exports.distinct = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _string = require("./string");

var _this = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
/**
 * Groups array of objects by attributre
 * @param arr - the source array
 * @param key - the attribute to group by
 * @return array of groups
 */


exports.transpose = transpose;

var groupBy = function groupBy(arr, key) {
  return arr.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

exports.groupBy = groupBy;

var unique = function unique(arr, prop) {
  var temp = arr.map(function (obj) {
    return prop ? get(prop, obj) : obj;
  });
  return arr.filter(function (obj, i) {
    return temp.indexOf(prop ? get(prop, obj) : obj) == i;
  });
};
/**
 * @param k1=v1,k2=v2, ...
 * @return { k1: v1, k2: v2 .. }
 */


exports.unique = unique;

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

exports.deserialize = deserialize;

var removeProp = function removeProp(obj, prop) {
  return Object.keys(obj).reduce(function (acc, key) {
    return key !== prop ? _objectSpread({}, acc, (0, _defineProperty2["default"])({}, key, obj[key])) : acc;
  }, {});
};

exports.removeProp = removeProp;

var removeProps = function removeProps(obj, props) {
  while (props.length > 0) {
    obj = removeProp(obj, props.pop());
  }

  return obj;
};
/**
 * get attribute value (even if nested)
 * @param  p : attribute name
 * @param  o : object
 * @return o[p] respectively o[p1][p2]...
 */


exports.removeProps = removeProps;

var get = function get(p, o) {
  return p.split(".").reduce(function (xs, x) {
    if (xs && xs[x]) return xs[x];else return null;
  }, o);
};
/**
 * set attribute value (even if nested)
 * @param  name : attribute name
 * @param  value : attribute value
 * @param  obj : object
 * @return o[p] respectively o[p1][p2]...
 */


exports.get = get;

var set = function set(name, value, obj) {
  // update state with new values
  var keyArray = name.split('.'); // depth of the value

  var l = keyArray.length; // dummy

  var f = obj;
  keyArray.map(function (k, i) {
    if (i === l - 1) {
      f[k] = value;
    } else {
      if (!f[k]) {
        f[k] = {};
      }
    }

    f = f[k];
  });
  return obj;
};
/**
 * helper function when updating a form that assign incoming obj {name, value} to existing form object {}
 * @param  form: form as object
 * @param  newObj: new field that was updated
 * @return updated form
 */


exports.set = set;

var updateObject = function updateObject(form, newObj) {
  return set(newObj.name, newObj.value, form);
};
/**
 * checks if object is empty
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */


exports.updateObject = updateObject;

var isEmpty = function isEmpty(obj) {
  if (!obj) return true;

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }

  return true;
};
/**
 * removes prefix for all keys
 */


exports.isEmpty = isEmpty;

var removePrefix = function removePrefix(obj, prefix) {
  if (obj.data) return obj.data;
  return Object.keys(obj).reduce(function (a, key) {
    return _objectSpread({}, a, (0, _defineProperty2["default"])({}, key.replace(prefix, ""), obj[key]));
  }, {});
};
/**
   * sort array of objects by attribute
   * @async see http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
   * @param array: array to sort
   * @param attr: attribute to sort with
   * @param asc: if true - sort ascending, false - descending
   * @return sorted array by attribute
   */


exports.removePrefix = removePrefix;

var sortByProp = function sortByProp(arr, attr, asc) {
  if (!arr) return null; // by default aattribute is name

  if (typeof attr === 'undefined') {
    attr = 'name';
  }

  if (typeof asc === 'undefined') {
    asc = true;
  }

  var lower = function lower(value) {
    if (typeof value === 'number') return value;else return value && value.length > 0 ? value.toLowerCase() : '';
  };

  var compare = function compare(a, b) {
    var attrA = lower((0, _string.removeWhitespace)(_this.get(attr, a)));
    var attrB = lower((0, _string.removeWhitespace)(_this.get(attr, b)));
    var comparison = 0;
    if (attrA > attrB) comparison = 1;else comparison = -1;
    return asc ? comparison : comparison * -1;
  };

  return arr.sort(compare);
};
/**
 * compares two objects by prop
 * @param a: obj 1
 * @param b: obj 2
 * @param attr: object property that is used for comparison
 * @return {1, 0, -1}
*/


exports.sortByProp = sortByProp;

var compareObj = function compareObj(a, b, attr) {
  var date = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var valueA = _this.get(attr, a);

  var valueB = _this.get(attr, b);

  if (!valueA || !valueB) {
    return 0;
  }

  if (date) return moment(a.publishedAt).unix() - moment(b.publishedAt).unix();

  if (typeof valueA === 'string') {
    valueA = valueA.toLowerCase();
  }

  if (typeof valueB === 'string') {
    valueB = valueB.toLowerCase();
  }

  return valueA.localeCompare(valueB);
};

exports.compareObj = compareObj;