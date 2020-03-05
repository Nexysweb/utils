/**
 * Date utils
 * note: some functions do not work with Node, work with Moment?
 */
import { padding } from './string';

export const format = {
  date: 'd-m-Y',
  dateTime: 'd-m-Y H:i'
};

/**
 * format date
 * @param  timestamp: timestamp to format
 * @return formatted date
*/
export const formatDate = (timestamp:string | Date):string => {
  if (typeof timestamp === 'undefined') {
    return '';
  }

  const date = new Date(timestamp);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const month = monthIndex + 1;
  return padding(day, 2) + '.' + padding(month, 2) + '.' + padding(year, 4);
};

/**
 * format date from object into string of format yyyy-mm-dd
 * @param  obj: date object
 * @return formatted date
*/
export const formatDateFromObject = (obj:Date):string => {
  if (typeof obj !== 'object') {
    return '';
  }
  const day = obj.getDate();
  const month = obj.getMonth() + 1;
  const year = obj.getFullYear();
  return padding(year, 4) + '-' + padding(month, 2) + '-' + padding(day, 2);
};

/**
 * format time
 * @param  timestamp: timestamp to format
 * @return formatted time
*/
export const formatTime = (timestamp:string | Date):string => {
  const date = new Date(timestamp);
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  return padding(hours, 2) + ':' + padding(minutes, 2) + ':' + padding(seconds, 2);
};

/**
 * parse date
 * @param date: JS date
 * @return object with different date elements
 * note: Js indexes month beginning at 0, we want the "normal" month number, e.g. January => 1
 */
export const parseDate = (date:Date):{day:number, month:number, year:number} => {
  return {
    day: date.getDate(),
    month: (date.getMonth() + 1),
    year: date.getFullYear()
  };
};



/**
 * add years to date
 * @param date: date to add years to
 * @param n: number of years // by default add 1 yea
 * @return new date
 */
export const addYears = (date: Date, n:number = 1) => new Date(date.setFullYear(date.getFullYear() + n));

/**
 * @param  n: number of years to be returned (default 4)
 * @param  date: date until which list of years is given (default: now)
 * @return list of years until given date
 */
export const yearsList = (n:number = 4, date:Date = new Date()) => {
  const year = date.getFullYear();

  const r = [];

  let i = 0;
  while (i < n) {
    const y = year - n + i + 1;
    r.push(y);

    i += 1;
  }

  return r;
};

/**
 * add months to date
 * @param date: date to add months to
 * @param n: number of months // by default add 1 months
 * @return new date
 */
export const addMonths = (date:Date, n:number = 1):Date => new Date(date.setMonth(date.getMonth() + n));

/**
 * add days to date
 * @param date: date to add days to
 * @param n: number of days // by default add 1 day
 * @return new date
 */
export const addDays = (date:Date, n:number = 1):Date => new Date(date.setDate(date.getDate() + n));

export const addMs =(date:Date, n:number = 1):Date => new Date(date.setMilliseconds(n));

/**
 * find number of day in one month
 * @param month: month index!
 * @param year: year index
 * @see http://stackoverflow.com/questions/9711454/how-to-get-the-last-date-of-a-particular-month-with-jodatime
 * @return number of days in month
 */
export const findNumberOfDaysInMonth = (month:number, year:number = new Date().getFullYear()):number => {
  let nMonth:number = month;
  let nYear:number = year;

  if (month === 12) {
    nMonth = 1;
    nYear = year + 1;
  }

  // Set the Date in First of the next Month:
  const datePlusOneDay:Date = new Date(nYear, nMonth - 1, 1);
  // Now take away one day and now you have the last day in the month correctly
  return addDays(datePlusOneDay, -1).getDate();
};

/**
 * Counts the number of days between two days
 * @param d1, d2 - dates to count days between
 * @return number of days
 */
export const countDaysDiffBtnDates = (d1:Date, d2:Date):number => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.ceil(Math.abs((d1.getTime() - d2.getTime()) / (oneDay)));
};

/**
 * Converts the date to ISO format
 * @param d date  to convert
 * @return ISO date
 */
export const dateToISO = (d:Date | string):string => {
  if (typeof (d as Date).toISOString === 'function') {
    return (<Date>d).toISOString();
  }

  const s = d.toString();
  return new Date(s).toISOString(); 
};

export const monthNames:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Seq', 'Oct', 'Nov', 'Dec'];