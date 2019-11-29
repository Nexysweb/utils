import { removeWhitespace } from './string';

/**
 * @see https://codeburst.io/javascript-array-distinct-5edc93501dc4
 * @return only distinct entries in an array 
 */
export const distinct = arr => [...new Set(arr)];

/**
 * transposes an object in the mathematical terms; i.e. rows become columns and columns become rows.
 * Note: the cardinality of the two outer and inner objects must be the same
 * @param  arr: the object that will be transposed
 * @param  fn  function that maps the value that is transposed to a potential other value. By default returns same value
 * @return transposed object
 */
export const transpose = (arr, fn = a => a) => {
  const r = {};

  Object.keys(arr).map(idx => {
    return Object.keys(arr[idx]).map(d => {
      if (!r[d]) {
        r[d] = {};
      }

      r[d][idx] = fn(arr[idx][d]);

      return true;
    })
  });

  return r;
}

/**
 * Groups array of objects by attributre
 * @param arr - the source array
 * @param key - the attribute to group by
 * @return array of groups
 */
export const groupBy = function(arr, key) {
  const callback = function(acc, v) {
    (acc[get(key, v)] = acc[get(key, v)] || []).push(v);
    return acc;
  }

  const grouped = arr.reduce(callback, {});
  return grouped; 
};

export const unique = function(arr, prop) {
  const temp = arr.map(obj => {
    return prop ? get(prop, obj) : obj 
  });

  return arr.filter((obj, i) => temp.indexOf(prop ? get(prop, obj) : obj) == i);
}

/**
 * @param k1=v1,k2=v2, ...
 * @return { k1: v1, k2: v2 .. }
 */
export const deserialize = str => str.split(',').reduce((r, item) => {
  const arr = item.split('=');

  if (arr.length === 2) {
    const [ key, value] = arr;

    return  {...r, [key]: value};
  }

  return r;
}, {});

export const keepProps = (obj, props) => {
  if (!props || !Array.isArray(props)) return obj;

  return Object.entries(obj)
    .reduce((acc, [key, value]) => props.includes(key) ? ({...acc, [key]: value}) : acc, {});
}   

export const removeProp = (obj, prop) => Object.keys(obj)
  .reduce((acc, key) => key !== prop ? ({...acc, [key]: obj[key]}) : acc, {});

export const removeProps = (obj, props) => {
  while (props.length > 0) {
    obj = removeProp(obj, props.pop());
  }
  return obj;
}

/**
 * get attribute value (even if nested)
 * @param  p : attribute name
 * @param  o : object
 * @return o[p] respectively o[p1][p2]...
 */
export const get = function(p, o) { 
  return p.split(".").reduce((xs, x) => {
    if (xs && (xs[x] || xs[x] === 0 || xs[x] === false)) return xs[x];
    else return null;
  }, o);
};

/**
 * set attribute value (even if nested)
 * @param  name : attribute name
 * @param  value : attribute value
 * @param  obj : object
 * @return o[p] respectively o[p1][p2]...
 */
export const set = (name, value, obj) => {
  // update state with new values
  const keyArray = name.split('.');

  // depth of the value
  const l = keyArray.length;
  // dummy
  let f = obj;

  keyArray.map((k, i) => {
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
export const updateObject = (form, newObj) => set(newObj.name, newObj.value, form);

/**
 * checks if object is empty
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const isEmpty = obj => {
  if (!obj) return true;
  for (let key in obj) if(obj.hasOwnProperty(key)) return false;
  return true;
}

export const hasProp = (o, prop) => {
  return !isEmpty(o) && prop && (prop in o);
}

/**
 * removes prefix for all keys
 */
export const removePrefix = (obj, prefix) => {
  if (obj.data) return obj.data;
  return Object.keys(obj).reduce((a, key) => ({...a, [key.replace(prefix, "")]: obj[key] }), {});
}

// needed for sort by prop
export const lower = value => {
  if (typeof value === 'number') return value;
  
  if(value && value.length > 0) {
    return value.toLowerCase();
  }

  return '';
}

/**
   * sort array of objects by attribute
   * @async see http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
   * @param array: array to sort
   * @param attr: attribute to sort with
   * @param asc: if true - sort ascending, false - descending
   * @return sorted array by attribute
   */
export const sortByProp = (arr, attr = 'name', asc = true) => {
  if (!arr) return null;

  const compare = (a, b) => {
    let attrA = lower(removeWhitespace(get(attr, a)));
    let attrB = lower(removeWhitespace(get(attr, b)));
    let comparison = 0;
    if (attrA > attrB) comparison=1; else comparison=-1;
    return asc ? comparison : comparison*-1;
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
export const compareObj = (a, b, attr) => {
  let valueA = get(attr, a);
  let valueB = get(attr, b);

  if (!valueA || !valueB) {
    return 0;
  }

  if (typeof valueA === 'string') {
    valueA = valueA.toLowerCase();
  }
  if (typeof valueB === 'string') {
    valueB = valueB.toLowerCase();
  }

  return valueA.localeCompare(valueB);
};

/**
 * look at a new record and compares it against a list of already existing records and decide it it needs to be added, edited, is a duplicate or do nothing
 * @param  {[type]}  newRecord: new record
 * @param  {[type]}  oldRecords: records to be compared against
 * @param  {Boolean} isRecordFound: compares new record with one of the prevous record
 * @param  {Boolean} isDuplicate: defined whether duplicates or not (comes after `isRecordFound`)
 * @param  {Boolean} isNotNull: conditions that make the new record not null and hence to be added =
 * @return list of [edit, duplicate, add, warning] rows
 */
export const compareWithArray = (newRecord, oldRecords, isRecordFound, isDuplicate = x => false, isNotNull = x => true) => {
  // check if figure already exists in db
  const recordFound = oldRecords.find(x => isRecordFound(newRecord, x));

  if (recordFound) {
    console.log('here')
    // remove entry from array to increase search speed for subsequent entries
    //delete(oldRecords.indexOf(recordFound));
    // check if value is the same, if not, need to edit
    if(isDuplicate(recordFound, newRecord)) {
      // update the value
      // update the importlog
      // which is equivalent to take the newer input var

      // add to edits
      return {edit: true, data: newRecord, id: recordFound.id };
    } else {
      return {duplicate: true, id: recordFound.id, message: 'the same figure was already found in the system', data: newRecord};
    }
  } else {
    if (isNotNull(newRecord)) {
      return {add: true, data: newRecord};
    } else {
      // no action completed, return false
      return {warning: true, message: 'not imported the value is non existent (null)', data: newRecord};
    }
  }
}
