// resources for array
// https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848
import { sum } from './number';

/**
 * turn an array of {true/false} into {1,0}
 * @param  arr: array of interest
 * @return int array
 */
export const arrayBooleanToInt = arr => {
  return arr.map(a => {
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
export const sumArrayBoolean = arr => sum(arrayBooleanToInt(arr));

/**
 * check if object is in array
 * @param k: value to be equal to
 * @param  arr: array of objects
 * @return index if exists otherwise null
 */
export const isObjectInArray = (k, arr) => {
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
export const isObjectAttrInArray = (k, arr, attr = 'id') => {
  let idx = null;

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
export const isNestedObjectAttrInArray = (k, arr, nest, attr) => {
  let idx = null;

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
export const createArrayOfLength = (n, idx = 1) => Array.from({length: n}, (v, k) => k + idx);

/**
 * flatten passed multy-dimensional array
 * @param arr: multy-dimensional array
 * @return flatten array
 */
export const flattenArray = arr => [].concat.apply([], arr);

// start comparison helper
export const compareArrayEntriesDepth = (a, b, attr) => {
  const s = attr.split('.');

  let ca = a[attr];
  let cb = b[attr];

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

export const compareArrayEntriesWAttr = (a, b, attr) => compareArrayEntries(a[attr], b[attr]);

export const compareArrayEntries = (a, b) => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};
// end comparison helper

/**
 * sort array of objects by attribute
 * @async see http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
 * @param array: array to sort
 * @param attr: attribute to sort with // by default aattribute is name
 * @param asc: if true - sort ascending, false - descending
 * @param compareFn: function used to compare objects
 * @return sorted array by attribute
 */
export const sortArrayByAttribute = (array, attr = 'name', asc = true, compareFn = compareArrayEntriesWAttr) => {
  const r = array.sort((a, b) => compareFn(a, b, attr));

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
export const isValueInArray = (array, value, attr = 'id') => {
  if (typeof attr === 'undefined') {
    attr = 'id';
  }
  
  return array.find(a => a[attr] === value);
};

/**
 * find value in an array
 * @param array: array of interest
 * @param value: value of interest
 * @return index
 */
export const findArrayIndexOfValue = (array, value) => {
  let r = null;

  array.map((a, i) => {
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
export const findArrayIndexOfValueByAttr = (array, value, attr) => {
  if (typeof attr === 'undefined') {
    attr = 'id';
  }

  let r = null;

  array.map((a, i) => {
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
export const getArrayLastNElements = (arr, n) => {
  const arraySize = arr.length;

  if (arraySize <= n) {
    return arr;
  }

  return arr.slice(arraySize - n, arraySize);
};

export const shuffle = source => {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};