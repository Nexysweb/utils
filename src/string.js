/**
 * return file size in human readable format
 * @param size: file size in bytes
 * @return file size in readable format
 */
const readableFileSize = size => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
};

/**
 * padding of string
 * @param m: input number
 * @param width: padding size
 * @param z: padding character (default: 0)
 * @return padded string
 */
const padding = (m, width, z) => {
  z = z || '0';
  const n = String(m);
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/**
 * check if string b is contained in string a
 * @param a: string to search into
 * @param b: string to search
 * @return true/false
 */
const contains = (a, b) => {
  return (a.toLowerCase().indexOf(b.toLowerCase()) > -1);
};

/**
* Parses the name of type '[0].lesson' or '[1].owner'
* @param name: name to parse
* @return obj with i = index, key = name
*/
const parseName = name => {
  return {i: name.substr(1, 1), key: name.substr(4, name.length - 1)};
};

/**
 * formats string so that first letter is upper case and rest lower case
 * @param s string to capitalize
 */
const capitalize = s => {
  // 1. upper case first char
  var h = s.charAt(0).toUpperCase();
  // 2. get tail of string
  var t = s.slice(1).toLowerCase();
  return h + t;
};

/**
 * remove whitespaces from a string
 * @param  value
 * @return value without whitespaces
 */
export const removeWhitespace = value => {
  // TODO: is not object literal
  if (value && isNaN(value)) return value.replace(/\s/g, "");
  else return value;
}


export const paramsToString = params => Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');

export const parseEnvVar = (value='') => {
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
};

export {readableFileSize, padding, contains, parseName, capitalize};