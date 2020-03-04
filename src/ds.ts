import { removeWhitespace } from './string';

/**
 * @see https://codeburst.io/javascript-array-distinct-5edc93501dc4
 * @return only distinct entries in an array 
 */
export const distinct = (arr:any[]):any[] => [...new Set(arr)];

/**
 * transposes an object in the mathematical terms; i.e. rows become columns and columns become rows.
 * Note: the cardinality of the two outer and inner objects must be the same
 * @param  arr: the object that will be transposed
 * @param  fn  function that maps the value that is transposed to a potential other value. By default returns same value
 * @return transposed object
 */
export const transpose = (arr:any, fn:(a:any) => any = a => a) => {
  const r:{[k:string]:any} = {};

  Object.keys(arr).map(idx => {
    return Object.keys(arr[idx]).map((d:string) => {
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
export const groupBy = (arr:any[], key:any):{[k:string]:any[]} => {
  const callback = function(acc:any, v:any) {
    (acc[get(key, v)] = acc[get(key, v)] || []).push(v);
    return acc;
  }

  const grouped = arr.reduce(callback, {});
  return grouped; 
};

export const unique = (arr:any[], prop:any):any => {
  const temp = arr.map(obj => {
    return prop ? get(prop, obj) : obj 
  });

  return arr.filter((obj, i) => temp.indexOf(prop ? get(prop, obj) : obj) == i);
}

/**
 * @param k1=v1,k2=v2, ...
 * @return { k1: v1, k2: v2 .. }
 */
export const deserialize = (str:string):{[k:string]:string} => str.split(',').reduce((r, item) => {
  const arr = item.split('=');

  if (arr.length === 2) {
    const [ key, value] = arr;

    return  {...r, [key]: value};
  }

  return r;
}, {});

export const keepProps = (obj:any, props:any):any => {
  if (!props || !Array.isArray(props)) return obj;

  return Object.entries(obj)
    .reduce((acc, [key, value]) => props.includes(key) ? ({...acc, [key]: value}) : acc, {});
}   

export const removeProp = (obj:any, prop:any):any => Object.keys(obj)
  .reduce((acc, key) => key !== prop ? ({...acc, [key]: obj[key]}) : acc, {});

export const removeProps = (obj:any, props:any):any => {
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
export const get = (p:any, o:any):any => { 
  return p.split(".").reduce((xs:any, x:any) => {
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
export const set = (name:string, value:any, obj:any) => {
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
export const updateObject = (form:any, newObj:any):any => set(newObj.name, newObj.value, form);

/**
 * checks if object is empty
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const isEmpty = (obj:any):boolean => {
  if (Array.isArray(obj)) return false;
  if (!obj) return true;
  for (let key in obj) if(obj.hasOwnProperty(key)) return false;
  return true;
}

/**
 * check if object has prop
 * @param   o: object
 * @param  prop: prop of interest
 * @return boolean
 */
export const hasProp = (o:any, prop:any):boolean => !isEmpty(o) && prop && (prop in o);

/**
 * removes prefix for all keys
 */
export const removePrefix = (obj:any, prefix:string):any => {
  if (obj.data) return obj.data;
  return Object.keys(obj).reduce((a, key) => ({...a, [key.replace(prefix, "")]: obj[key] }), {});
}

// needed for sort by prop
export const lower = (value:any):string | number => {
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
export const sortByProp = (arr:any[], attr:string = 'name', asc:boolean = true):any[] | null => {
  if (!arr) return null;

  const compare = (a:any, b:any):number => {
    let attrA = lower(removeWhitespace(String(get(attr, a))));
    let attrB = lower(removeWhitespace(String(get(attr, b))));
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
export const compareObj = (a:any, b:any, attr:string):number => {
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
export const compareWithArray = (newRecord:any, oldRecords:any[], isRecordFound: (a:any, b:any) => boolean, isDuplicate:(a:any, b:any) => boolean = x => false, isNotNull:(a:any) => boolean = x => true) => {
  // check if figure already exists in db
  const recordFound = oldRecords.find(x => isRecordFound(newRecord, x));

  if (recordFound) {
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

// NOTE: https://github.com/hapijs/joi/issues/2215
export const isJoi = (schema:any):boolean => schema.hasOwnProperty('$_root') || schema.hasOwnProperty('$_super');

export const isObject = (item:any):boolean => {
  if (!item) return false;

  if (isJoi(item)) return false;
  else return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

export const deepMerge = (target:any, source:any):any => {
  if (isObject(target) && isObject(source)) {
    Object.entries(source).forEach(([key, sourceValue]) => {
      if (isObject(sourceValue)) {
        if (!target[key]) {
          Object.assign(target, {[key]: {}});
        } 

        const next = target[key];
        deepMerge(next, sourceValue);
      } else {
        Object.assign(target, {[key]: sourceValue});
      }
    });
  }

  return target;
}

export const nest = (data:any = null, props:any=[]):any => {
  if (data === undefined || data === null) return null;

  if (props.length === 0) {
    // NOTE: handle object => array
    if (!Array.isArray(data)) {
      data = Object.entries(data).map(([key, value]) => ({key, value}));
    }

    // NOTE: if array empty - return empty object
    if (data.length === 0) return {};

    let nested = {};
    data.forEach(({key, value}:{key:any, value:any}) => {
      const props = key.split('.');
      const obj = nest(value, props);
      nested = deepMerge(nested, obj);
    });

    return nested;
  } else {
    const value = data;
    const [prop, ...rest] = props;
    if (rest.length === 0) {
      return { [prop]: value };
    }
  
    const result = nest(value, [...rest]);
    return { [prop]: result };
  }
}

/**
 * Takes a json object and flattens it
 * {'a': {'b': 'c'}, 'd': 'e'} -> [{key: 'a.b', value: 'c'}, {key: 'd', value: 'e'}]
**/
export const linearize = (obj:any, keys:any[]=[]) => {
  let list:{[k:string]:any}[] = [];

  Object.entries(obj).map(([key, value]) => {
    const next = [...keys, key];
    if (isObject(value)) {
      const subList = linearize(value, next);
      list = [...list, ...subList];
    } else {
      list.push({key: next.join('.'), value});
    }
  });

  return list;
}

/**
 * get list of "linezrized" keys for an object (where  linearized is nesting represented by '.')
 * @param   o : input object
 * @return ['key1', 'key2', ...]
 */
export const getLinearizedKeys = (o:any):any[] => {
  return Object.keys(o).map(key => {
    let value = o[key];
    if (value != null && typeof value == 'object') {
      const nestedKeys = getLinearizedKeys(value);
      return nestedKeys.map(item => `${key}.${item}`);
    } else return key;
  }).flat();
}

export const cleanObject = (obj:any, removeNull=true):any => {
  for (const propName in obj) { 
    if (removeNull && obj[propName] === null) {
      delete obj[propName];
    } else if (obj[propName] === undefined) {
      delete obj[propName];
    } else {
      if (typeof obj[propName] === 'object' && obj[propName] !== null) {
        cleanObject(obj[propName]);
      }
    }
  }
}