"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArrayLastNElements = exports.findArrayIndexOfValueByAttr = exports.findArrayIndexOfValue = exports.isValueInArray = exports.sortArrayByAttribute = exports.flattenArray = exports.createArrayOfLength = exports.isNestedObjectAttrInArray = exports.isObjectAttrInArray = exports.isObjectInArray = exports.sumArrayBoolean = exports.arrayBooleanToInt = void 0;

var _number = require("./number");

/**
 * turn an array of {true/false} into {1,0}
 * @param  arr: array of interest
 * @return int array
 */
var arrayBooleanToInt = function arrayBooleanToInt(arr) {
  return arr.map(function (a) {
    if (a === true) {
      return 1;
    }

    return 0;
  });
};
/**
 * sum elements of array of boolean
 * @param  arr: array of boolean
 * @return sum value
 */


exports.arrayBooleanToInt = arrayBooleanToInt;

var sumArrayBoolean = function sumArrayBoolean(arr) {
  return (0, _number.sum)(arrayBooleanToInt(arr));
};
/**
 * check if object is in array
 * @param k: value to be equal to
 * @param  arr: array of objects
 * @return index if exists otherwise null
 */


exports.sumArrayBoolean = sumArrayBoolean;

var isObjectInArray = function isObjectInArray(k, arr) {
  var a = arr.indexOf(k);

  if (a === -1) {
    return null;
  }

  return a;
};
/**
 * check if object attribute is in array
 * @param k: value to be equal to
 * @param  arr: array of integer
 * @param  attr: attribute of integer, default, "id"
 * @return index if exists otherwise null
 */


exports.isObjectInArray = isObjectInArray;

var isObjectAttrInArray = function isObjectAttrInArray(k, arr) {
  var attr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  var idx = null;
  arr.filter(function (d, i) {
    if (d[attr] && d[attr] === k) {
      idx = i;
      return d;
    }

    return d;
  });
  return idx;
};
/**
 * check if nested object attribute is in array of objects
 * @param k: value to be equal to
 * @param  arr: array of integer
 * @param nest: nested object
 * @param  attr: attribute of integer, default, "id"
 * @return index if exists otherwise null
 */


exports.isObjectAttrInArray = isObjectAttrInArray;

var isNestedObjectAttrInArray = function isNestedObjectAttrInArray(k, arr, nest, attr) {
  var idx = null;

  if (typeof attr === 'undefined') {
    attr = 'id';
  }

  arr.filter(function (d, i) {
    if (d[nest]) {
      if (d[nest][attr] && d[nest][attr] === k) {
        idx = i;
        return d;
      }
    }

    return d;
  });
  return idx;
};
/**
 * create array of length n starting from index
 * @param  n: array length
 * @param idx: begin number, default 1
 * @return array of consecutive number of size n, e.g. [1,2,3,4,5]
 */


exports.isNestedObjectAttrInArray = isNestedObjectAttrInArray;

var createArrayOfLength = function createArrayOfLength(n) {
  var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Array.from({
    length: n
  }, function (v, k) {
    return k + idx;
  });
};
/**
 * flatten passed multy-dimensional array
 * @param arr: multy-dimensional array
 * @return flatten array
 */


exports.createArrayOfLength = createArrayOfLength;

var flattenArray = function flattenArray(arr) {
  return [].concat.apply([], arr);
}; // start comparison helper


exports.flattenArray = flattenArray;

var compareArrayEntriesDepth = function compareArrayEntriesDepth(a, b, attr) {
  var s = attr.split('.');
  var ca = a[attr];
  var cb = b[attr];

  switch (s.length) {
    case 3:
      ca = a[s[0]][s[1]][s[2]];
      cb = b[s[0]][s[1]][s[2]];
      break;

    case 2:
      ca = a[s[0]][s[1]];
      cb = b[s[0]][s[1]];
      break;

    default:
      ca = a[s[0]];
      cb = b[s[0]];
      break;
  }

  return compareArrayEntries(ca, cb);
};

var compareArrayEntriesWAttr = function compareArrayEntriesWAttr(a, b, attr) {
  return compareArrayEntries(a[attr], b[attr]);
};

var compareArrayEntries = function compareArrayEntries(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}; // end comparison helper

/**
 * sort array of objects by attribute
 * @async see http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
 * @param array: array to sort
 * @param attr: attribute to sort with // by default aattribute is name
 * @param asc: if true - sort ascending, false - descending
 * @param compareFn: function used to compare objects
 * @return sorted array by attribute
 */


var sortArrayByAttribute = function sortArrayByAttribute(array) {
  var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';
  var asc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var compareFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : compareArrayEntriesWAttr;
  var r = array.sort(function (a, b) {
    return compareFn(a, b, attr);
  });

  if (asc) {
    return r;
  }

  return r.reverse();
};
/**
 * checks if value is in array
 * @param array: array of interest
 * @param value: value of interest
 * @param attr: attrribute where value is stored (default id)
 * @return boolean
 */


exports.sortArrayByAttribute = sortArrayByAttribute;

var isValueInArray = function isValueInArray(array, value) {
  var attr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';

  if (typeof attr === 'undefined') {
    attr = 'id';
  }

  return array.find(function (a) {
    return a[attr] === value;
  });
};
/**
 * find value in an array
 * @param array: array of interest
 * @param value: value of interest
 * @return index
 */


exports.isValueInArray = isValueInArray;

var findArrayIndexOfValue = function findArrayIndexOfValue(array, value) {
  var r = null;
  array.map(function (a, i) {
    if (a === value) {
      r = i;
    }

    return true;
  });
  return r;
};
/**
 * find an attribute value in an array
 * @param array: array of interest
 * @param value: value of interest
 * @param attr: attr where value is stored (default id)
 * @return index
 */


exports.findArrayIndexOfValue = findArrayIndexOfValue;

var findArrayIndexOfValueByAttr = function findArrayIndexOfValueByAttr(array, value, attr) {
  if (typeof attr === 'undefined') {
    attr = 'id';
  }

  var r = null;
  array.map(function (a, i) {
    if (a[attr] === value) {
      r = i;
    }

    return true;
  });
  return r;
};
/**
 * @return last n elements of array
 * @param array
 * @param n: number of elements to be returned
 */


exports.findArrayIndexOfValueByAttr = findArrayIndexOfValueByAttr;

var getArrayLastNElements = function getArrayLastNElements(arr, n) {
  var arraySize = arr.length;

  if (arraySize <= n) {
    return arr;
  }

  return arr.slice(arraySize - n, arraySize);
};

exports.getArrayLastNElements = getArrayLastNElements;