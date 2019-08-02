/**
 * todo:library
 * todo:consolidate
 */

import {padding} from './string';

/**
 * @param k1=v1,k2=v2, ...
 * @return { k1: v1, k2: v2 .. }
 */
const deserialize = str => str.split(',').reduce((r, item) => {
  const arr = item.split('=');

  if (arr.length === 2) {
    const [ key, value] = arr;

    return  {...r, [key]: value};
  } else return r;
}, {});

const get = function(p, o) { 
  return p.split(".").reduce(function(xs, x) {
    if (xs && xs[x]) return xs[x];
    else return null;
  }, o);
};

const groupBy = (arr, key) => {
  const callback = (acc, v) => {
    // dummy variable that is the value of the key
    const k = get(key, v);

    (acc[k] = acc[k] || []).push(v);
    return acc;
  }

  return arr.reduce(callback, {});
};

const unique = function(arr, prop) {
  const temp = arr.map(obj => {
    return prop ? get(prop, obj) : obj 
  });

  return arr.filter(function(obj, i) { return temp.indexOf(prop ? get(prop, obj) : obj) == i; });
}



const formatDate = function(date) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const month = monthIndex + 1;
  return padding(day, 2) + '.' + padding(month, 2) + '.' + padding(year, 4);
}

const paramsToString = params => Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');

const parseEnvVar = (value='') => {
  const end = value.length - 1;
  const isDoubleQuoted = value[0] === '"' && value[end] === '"';
  const isSingleQuoted = value[0] === "'" && value[end] === "'";

  // if single or double quoted, remove quotes
  if (isSingleQuoted || isDoubleQuoted) {
    value = value.substring(1, end);

    // if double quoted, expand newlines
    if (isDoubleQuoted) {
      const RE_NEWLINES = /\\n/g;
      const NEWLINE = '\n';
      value = value.replace(RE_NEWLINES, NEWLINE);
    }
  } else {
    // remove surrounding whitespace
    value = value.trim();
  }

  return value;
}

export default { get, groupBy, unique,padding, formatDate, deserialize, paramsToString, parseEnvVar };
