"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPhone = exports.capitalize = exports.parseName = exports.contains = exports.padding = exports.readableFileSize = exports.parseEnvVar = exports.removeWhitespace = void 0;

/**
 * return file size in human readable format
 * @param size: file size in bytes
 * @return file size in readable format
 */
var readableFileSize = function readableFileSize(size) {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
};
/**
 * padding of string
 * @param m: input number
 * @param width: padding size
 * @param z: padding character (default: 0)
 * @return padded string
 */


exports.readableFileSize = readableFileSize;

var padding = function padding(m, width, z) {
  z = z || '0';
  var n = String(m);
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
/**
 * check if string b is contained in string a
 * @param a: string to search into
 * @param b: string to search
 * @return true/false
 */


exports.padding = padding;

var contains = function contains(a, b) {
  return a.toLowerCase().indexOf(b.toLowerCase()) > -1;
};
/**
* Parses the name of type '[0].lesson' or '[1].owner'
* @param name: name to parse
* @return obj with i = index, key = name
*/


exports.contains = contains;

var parseName = function parseName(name) {
  return {
    i: name.substr(1, 1),
    key: name.substr(4, name.length - 1)
  };
};
/**
 * formats string so that first letter is upper case and rest lower case
 * @param s string to capitalize
 */


exports.parseName = parseName;

var capitalize = function capitalize(s) {
  // 1. upper case first char
  var h = s.charAt(0).toUpperCase(); // 2. get tail of string

  var t = s.slice(1).toLowerCase();
  return h + t;
};
/**
 * remove whitespaces from a string
 * @param  value
 * @return value without whitespaces
 */


exports.capitalize = capitalize;

var removeWhitespace = function removeWhitespace(value) {
  // TODO: is not object literal
  if (value && isNaN(value)) return value.replace(/\s/g, "");else return value;
};

exports.removeWhitespace = removeWhitespace;

var parseEnvVar = function parseEnvVar() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var end = value.length - 1;
  var isDoubleQuoted = value[0] === '"' && value[end] === '"';
  var isSingleQuoted = value[0] === "'" && value[end] === "'"; // if single or double quoted, remove quotes

  if (isSingleQuoted || isDoubleQuoted) {
    value = value.substring(1, end); // if double quoted, expand newlines

    if (isDoubleQuoted) {
      var RE_NEWLINES = /\\n/g;
      var NEWLINE = '\n';
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


exports.parseEnvVar = parseEnvVar;

var formatPhone = function formatPhone(p) {
  // get US prefix
  var usPrefix = p.substring(0, 3);
  var intlPrefix = p.substring(0, 2); // look for US number

  if (usPrefix === '001' && p.length === 13) {
    return '+1 (' + p.substr(3, 3) + ') ' + p.substr(6, 3) + '-' + p.substr(9, 4);
  } // look for international number (non US)


  if (intlPrefix === '00' && p.length === 13) {
    return '+' + p.substr(2, 2) + ' ' + p.substr(4, 2) + ' ' + p.substr(6, 3) + ' ' + p.substr(9, 2) + ' ' + p.substr(11, 2);
  }

  if (intlPrefix === '00' && p.length === 14) {
    return '+' + p.substr(2, 2) + ' ' + p.substr(4, 4) + ' ' + p.substr(8, 6);
  }

  if (intlPrefix != '00' && p.length === 10) {
    return p.substr(0, 3) + ' ' + p.substr(3, 3) + ' ' + p.substr(6, 2) + ' ' + p.substr(8, 2);
  }

  if (intlPrefix != '00' && p.length === 11) {
    return p.substr(0, 4) + ' ' + p.substr(4, 3) + ' ' + p.substr(5, 2) + ' ' + p.substr(9, 2);
  } // if it does not match anything simply return input


  return p;
};

exports.formatPhone = formatPhone;