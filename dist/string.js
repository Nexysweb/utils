"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = exports.parseName = exports.contains = exports.padding = exports.readableFileSize = void 0;

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

exports.capitalize = capitalize;