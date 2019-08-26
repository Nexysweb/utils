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

