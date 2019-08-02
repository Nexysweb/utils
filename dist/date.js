"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateToISO = exports.countDaysDiffBtnDates = exports.findNumberOfDaysInMonth = exports.addDays = exports.addMonths = exports.yearsList = exports.addYears = exports.parseDate = exports.formatTime = exports.formatDateFromObject = exports.formatDate = exports.format = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _string = require("./string");

/**
 * Date utils
 * note: some functions do not work with Node, work with Moment?
 */
var format = {
  date: 'd-m-Y',
  dateTime: 'd-m-Y H:i'
};
/**
 * format date
 * @param  timestamp: timestamp to format
 * @return formatted date
*/

exports.format = format;

var formatDate = function formatDate(timestamp) {
  if (typeof timestamp === 'undefined') {
    return '';
  }

  var date = new Date(timestamp);
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var month = monthIndex + 1;
  return (0, _string.padding)(day, 2) + '.' + (0, _string.padding)(month, 2) + '.' + (0, _string.padding)(year, 4);
};
/**
 * format date from object into string of format yyyy-mm-dd
 * @param  obj: date object
 * @return formatted date
*/


exports.formatDate = formatDate;

var formatDateFromObject = function formatDateFromObject(obj) {
  if ((0, _typeof2["default"])(obj) !== 'object') {
    return '';
  }

  var day = obj.getDate();
  var month = obj.getMonth() + 1;
  var year = obj.getFullYear();
  return (0, _string.padding)(year, 4) + '-' + (0, _string.padding)(month, 2) + '-' + (0, _string.padding)(day, 2);
};
/**
 * format time
 * @param  timestamp: timestamp to format
 * @return formatted time
*/


exports.formatDateFromObject = formatDateFromObject;

var formatTime = function formatTime(timestamp) {
  var date = new Date(timestamp);
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();
  return (0, _string.padding)(hours, 2) + ':' + (0, _string.padding)(minutes, 2) + ':' + (0, _string.padding)(seconds, 2);
};
/**
 * parse date
 * @param date: JS date
 * @return object with different date elements
 * note: Js indexes month beginning at 0, we want the "normal" month number, e.g. January => 1
 */


exports.formatTime = formatTime;

var parseDate = function parseDate(date) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
};
/**
 * add years to date
 * @param date: date to add years to
 * @param n: number of years
 * @return new date
 */


exports.parseDate = parseDate;

var addYears = function addYears(date, n) {
  // by default add 1 year
  if (typeof n === 'undefined') {
    n = 1;
  }

  return new Date(new Date(date).setYear(date.getFullYear() + n));
};
/**
 * @param  n: number of years to be returned (default 4)
 * @param  date: date until which list of years is given (default: now)
 * @return list of years until given date
 */


exports.addYears = addYears;

var yearsList = function yearsList(n, date) {
  if (typeof n === 'undefined') {
    n = 4;
  }

  if ((0, _typeof2["default"])(date) !== 'object') {
    date = new Date();
  }

  var year = date.getFullYear();
  var r = [];
  var i = 0;

  while (i < n) {
    var y = year - n + i + 1;
    r.push(y);
    i += 1;
  }

  return r;
};
/**
 * add months to date
 * @param date: date to add months to
 * @param n: number of months
 * @return new date
 */


exports.yearsList = yearsList;

var addMonths = function addMonths(date, n) {
  // by default add 1 months
  if (typeof n === 'undefined') {
    n = 1;
  }

  return new Date(new Date(date).setMonth(date.getMonth() + n));
};
/**
 * add days to date
 * @param date: date to add days to
 * @param n: number of days
 * @return new date
 */


exports.addMonths = addMonths;

var addDays = function addDays(date, n) {
  // by default add 1 day
  if (typeof n === 'undefined') {
    n = 1;
  }

  return new Date(new Date(date).setDate(date.getDate() + n));
};
/**
 * find number of day in one month
 * @param month: month index!
 * @param year: year index
 * @see http://stackoverflow.com/questions/9711454/how-to-get-the-last-date-of-a-particular-month-with-jodatime
 * @return number of days in month
 */


exports.addDays = addDays;

var findNumberOfDaysInMonth = function findNumberOfDaysInMonth(month, year) {
  // set default year if not given as param
  if (typeof year === 'undefined') {
    year = new Date().getFullYear();
  }

  var nMonth = month;
  var nYear = year;

  if (month === 12) {
    nMonth = 1;
    nYear = year + 1;
  } // Set the Date in First of the next Month:


  var datePlusOneDay = new Date(nYear, nMonth - 1, 1); // Now take away one day and now you have the last day in the month correctly

  return addDays(datePlusOneDay, -1).getDate();
};
/**
 * Counts the number of days between two days
 * @param d1, d2 - dates to count days between
 * @return number of days
 */


exports.findNumberOfDaysInMonth = findNumberOfDaysInMonth;

var countDaysDiffBtnDates = function countDaysDiffBtnDates(d1, d2) {
  var oneDay = 24 * 60 * 60 * 1000;
  return Math.ceil(Math.abs((d1.getTime() - d2.getTime()) / oneDay));
};
/**
 * Converts the date to ISO format
 * @param d date  to convert
 * @return ISO date
 */


exports.countDaysDiffBtnDates = countDaysDiffBtnDates;

var dateToISO = function dateToISO(d) {
  if (d && typeof d.getMonth !== 'function') {
    d = new Date(d).toISOString();
  }

  return d;
};

exports.dateToISO = dateToISO;