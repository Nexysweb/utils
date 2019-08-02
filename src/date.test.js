import {format, formatDate, formatDateFromObject, formatTime, parseDate, addYears, yearsList, addMonths, addDays, findNumberOfDaysInMonth, countDaysDiffBtnDates, dateToISO} from './date'

test('add days', () => {
  const date1 = new Date('2019-03-04T23:00:00.000Z');
  const date2 = new Date('2019-03-07T23:00:00.000Z');
  expect(addDays(date1, 3)).toEqual(date2)
});

test('add months', () => {
  const date1 = new Date('2019-03-04T23:00:00.000Z');
  const date2 = new Date('2019-06-04T22:00:00.000Z');
  expect(addMonths(date1, 3)).toEqual(date2)
});

test('add years', () => {
  const date1 = new Date('2019-03-04T00:00:00.000Z');
  const date2 = new Date('2021-03-04T00:00:00.000Z');
  expect(addYears(date1, 2)).toEqual(date2)
});

test('format date', () => {
  const date = new Date('2019-03-04');
  const sdate = '04.03.2019';
  expect(formatDate(date)).toEqual(sdate)
});

test('format date from object', () => {
  const date = new Date('2019-03-04');
  const sdate = '2019-03-04';
  expect(formatDateFromObject(date)).toEqual(sdate)
});

test('format time', () => {
  const date = new Date('2019-03-04 23:46:12');

  expect(formatTime(date)).toEqual('23:46:12')
});

test('format time', () => {
  const date = new Date('2019-03-04 23:46:12');

  expect(parseDate(date)).toEqual({year: 2019, month: 3, day: 4})
});

test('years list', () => {
  const date = new Date('2019-03-04 23:46:12');
  expect(yearsList(5, date)).toEqual([2015, 2016, 2017, 2018, 2019]);
});

test('findNumberOfDaysInMonth', () => {
  // note: it is the month INDEX
  const n1 = findNumberOfDaysInMonth(4, 2018)
  const n2 = 31;
  expect(n1).toEqual(n2);
});

test('countDaysDiffBtnDates', () => {
  const date1 = new Date('2019-03-04T23:00:00.000Z');
  const date2 = new Date('2019-06-04T22:00:00.000Z');
  expect(countDaysDiffBtnDates(date1, date2)).toEqual(92);
});

test('dateToISO', () => {
  const isoString = '2019-03-04T00:00:00.000Z'
  // only take y-m-d
  const isoStringTruncated = isoString.substr(0,10);

  const date1 = new Date(isoStringTruncated);
  const date2 = new Date(isoString)
  expect(dateToISO(date1)).toEqual(date2);
});
