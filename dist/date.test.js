"use strict";

var _date = require("./date");

test('add days', function () {
  var date1 = new Date('2019-03-04T23:00:00.000Z');
  var date2 = new Date('2019-03-07T23:00:00.000Z');
  expect((0, _date.addDays)(date1, 3)).toEqual(date2);
});
test('add months', function () {
  var date1 = new Date('2019-03-04T23:00:00.000Z');
  var date2 = new Date('2019-06-04T22:00:00.000Z');
  expect((0, _date.addMonths)(date1, 3)).toEqual(date2);
});
test('add years', function () {
  var date1 = new Date('2019-03-04T00:00:00.000Z');
  var date2 = new Date('2021-03-04T00:00:00.000Z');
  expect((0, _date.addYears)(date1, 2)).toEqual(date2);
});
test('format date', function () {
  var date = new Date('2019-03-04');
  var sdate = '04.03.2019';
  expect((0, _date.formatDate)(date)).toEqual(sdate);
});
test('format date from object', function () {
  var date = new Date('2019-03-04');
  var sdate = '2019-03-04';
  expect((0, _date.formatDateFromObject)(date)).toEqual(sdate);
});
test('format time', function () {
  var date = new Date('2019-03-04 23:46:12');
  expect((0, _date.formatTime)(date)).toEqual('23:46:12');
});
test('format time', function () {
  var date = new Date('2019-03-04 23:46:12');
  expect((0, _date.parseDate)(date)).toEqual({
    year: 2019,
    month: 3,
    day: 4
  });
});
test('years list', function () {
  var date = new Date('2019-03-04 23:46:12');
  expect((0, _date.yearsList)(5, date)).toEqual([2015, 2016, 2017, 2018, 2019]);
});
test('findNumberOfDaysInMonth', function () {
  // note: it is the month INDEX
  var n1 = (0, _date.findNumberOfDaysInMonth)(4, 2018);
  var n2 = 31;
  expect(n1).toEqual(n2);
});
test('countDaysDiffBtnDates', function () {
  var date1 = new Date('2019-03-04T23:00:00.000Z');
  var date2 = new Date('2019-06-04T22:00:00.000Z');
  expect((0, _date.countDaysDiffBtnDates)(date1, date2)).toEqual(92);
});
test('dateToISO', function () {
  var isoString = '2019-03-04T00:00:00.000Z'; // only take y-m-d

  var isoStringTruncated = isoString.substr(0, 10);
  var date1 = new Date(isoStringTruncated);
  var date2 = new Date(isoString);
  expect((0, _date.dateToISO)(date1)).toEqual(date2);
});