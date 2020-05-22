/**
 * padding of string
 * @param m: input number
 * @param width: padding size
 * @param z: padding character (default: 0)
 * @return padded string
 */
export const padding = (m:number, width:number, z:string = '0'):string => {
  const n = String(m);
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/**
 * return file size in human readable format
 * @param size: file size in bytes
 * @return file size in readable format
 */
export const readableFileSize = (size:number):string => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
};

/**
 * check if string b is contained in string a
 * @param a: string to search into
 * @param b: string to search
 * @return true/false
 */
export const contains = (a: string, b: string):boolean => {
  return (a.toLowerCase().indexOf(b.toLowerCase()) > -1);
};

/**
* Parses the name of type '[0].lesson' or '[1].owner'
* @param name: name to parse
* @return obj with i = index, key = name
*/
export const parseName = (name: string):{i: string, key:string} => {
  return {i: name.substr(1, 1), key: name.substr(4, name.length - 1)};
};

/**
 * formats string so that first letter is upper case and rest lower case
 * @param s string to capitalize
 */
export const capitalize = (s:string):string => {
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
export const removeWhitespace = (value:string):string => {
  // TODO: is not object literal
  return value.replace(/\s/g, "");
  // before typescript
  //if (value && isNaN(value)) 
  //else return value;
}

export const parseEnvVar = (value:string=''):string => {
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

/**
 * format a phone number
 * @param input clean number, e.g. 0041765545412
 * @return formatted: e.g. +41 76 554 54 12
 */
export const formatPhone = (p:string):string => {
  // get US prefix
  const usPrefix = p.substring(0, 3)
  const intlPrefix = p.substring(0, 2);

  // look for US number
  if (usPrefix === '001' && p.length === 13) {
    return '+1 (' + p.substr(3,3) + ') ' + p.substr(6, 3) + '-' + p.substr(9, 4);
  }

  // look for international number (non US)
  if (intlPrefix === '00' && p.length === 13) {
    return '+' + p.substr(2, 2) + ' ' + p.substr(4, 2) + ' ' + p.substr(6, 3) + ' ' + p.substr(9, 2)  + ' ' + p.substr(11, 2);
  }

  if (intlPrefix === '00' && p.length === 14) {
    return '+' + p.substr(2, 2) + ' ' + p.substr(4, 4) + ' ' + p.substr(8, 6);
  }

  if (intlPrefix != '00' && p.length === 10) {
    return p.substr(0, 3) + ' ' + p.substr(3, 3) + ' ' + p.substr(6, 2)  + ' ' + p.substr(8, 2);
  }

  if (intlPrefix != '00' && p.length === 11) {
    return p.substr(0, 4) + ' ' + p.substr(4, 3) + ' ' + p.substr(5, 2)  + ' ' + p.substr(9, 2);
  }

  // if it does not match anything simply return input
  return p;
}

/**
 * checks if input string is an email
 * @param   email
 * @return true/false
 * @see  https://stackoverflow.com/questions/13912597/validate-email-one-liner-in-scala/32445372#32445372
 * @see  http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
 */
export const isEmail = (email:string):boolean => {
  const emailRegex = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i

  const regexResult = email.match(emailRegex);

  if (!regexResult) {
    return false;
  }

  return regexResult.includes(email);
}

/**
 * checks if input string is a valid UUID
 * @param  {[type]} str     input UUID/string
 * @param  {String} version UUID type: {'all', '3', '4' ,'5'}
 * @return {[type]}         boolean
 *
 * taken from: https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js
 */
export const isUUID = (str:string, version:3 | 4 | 5 | 'all' = 'all'):Boolean => {
  const patterns = {
    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  };

  const pattern = patterns[version];
  return pattern && pattern.test(str);
}

// NOTE: more complete - .lodash.snakeCase()
export const camelToSnakeCase = (str:string):string => str.replace(/([a-z1-9])\.?(?=[A-Z]+)/g, '$1_').toLowerCase();

export const snakeToCamelCase = (str:string):string => str.replace(/(\_\w)/g, c => c[1].toUpperCase());

/**
 * lowers the first char of a string (rest of string remains intact)
 * @param s: input string
 * @return inut string with first char as lower case
 */
export const lowerFirst = (s:string):string => typeof s === 'string' ? s.charAt(0).toLowerCase() + s.substr(1) : s;

