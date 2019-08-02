"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFloat = exports.calcRatio = exports.isNumeric = exports.sum = exports.formatKprice = exports.formatNumberMini = exports.formatNumber = void 0;

/**
 * parse number into formatted number
 * @param v: number
 * @param p: precision
 * @see http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
 */
var formatNumber = function formatNumber(v, precision) {
  // by default decimal precision is 2
  if (typeof precision === 'undefined') {
    precision = 2;
  }

  var nr = v;

  if (typeof v === 'string') {
    nr = v.replace(',', '');
  }

  var pf = parseFloat(nr);

  if (isNaN(pf)) {
    return '';
  }

  var re = precision > 0 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g;
  return parseFloat(nr).toFixed(precision).replace(re, '$1\'');
};
/**
 * Format add decimals after comma depending on given precision
 * @param v: number
 * @param precision: precision (default: 2)
 * @return number with given precision
 */


exports.formatNumber = formatNumber;

var formatNumberMini = function formatNumberMini(v, precision) {
  if (typeof precision === 'undefined') {
    precision = 2;
  }

  if (isNaN(v)) {
    return '';
  }

  return Number(v).toFixed(precision);
};
/**
 * Format kPrice type of numbers
 * @param v: number
 * @return rounded number separated by commas
 */


exports.formatNumberMini = formatNumberMini;

var formatKprice = function formatKprice(v) {
  if (isNaN(v)) {
    return '';
  } // round value and separate thousands by comma of a round number


  return Math.round(v).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
/**
 * sums array made of numbers
 * @param arr: array of numbers
 */


exports.formatKprice = formatKprice;

var sum = function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  });
};
/**
 * check if passed value is numeric
 * @param value: value to check
 * @return true/false
 */


exports.sum = sum;

var isNumeric = function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
/**
* Calculates the ratio based on two numbers
* @param a, b: numbers
* @return calculated value
*/


exports.isNumeric = isNumeric;

var calcRatio = function calcRatio(a, b) {
  var r = 100 * a / b;

  if (isNaN(r)) {
    r = '';
  } else {
    r = formatNumber(r);
  }

  if (!isFinite(r)) {
    r = "\u221E";
  }

  return r;
};
/**
 * casts weirdly formatted numbers into float
 * @param  input string
 * @return float
 */


exports.calcRatio = calcRatio;

var toFloat = function toFloat(s) {
  if (!s || s === null || s === '') {
    return null;
  }

  return Number(s.replace("'", '').replace(" ", ''));
};

exports.toFloat = toFloat;