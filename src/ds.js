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
export const groupBy = (arr, key) => {
  return arr.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const unique = function(arr, prop) {
  const temp = arr.map(obj => {
    return prop ? get(prop, obj) : obj 
  });

  return arr.filter(function(obj, i) { return temp.indexOf(prop ? get(prop, obj) : obj) == i; });
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
  } else return r;
}, {});

export const get = function(p, o) { 
  return p.split(".").reduce(function(xs, x) {
    if (xs && xs[x]) return xs[x];
    else return null;
  }, o);
};

export const removeProp = (obj, prop) => {
  return Object.keys(obj)
    .reduce((acc, key) => key !== prop ? ({...acc, [key]: obj[key]}) : acc, {});
}

export const removeProps = (obj, props) => {
  while (props.length > 0) {
    obj = removeProp(obj, props.pop());
  }
  return obj;
}
