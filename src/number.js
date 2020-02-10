/**
 * parse number into formatted number
 * @param v: number
 * @param p: precision
 * @param delimiter: thousand separator, default " ' "
 * @see http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
 */
const formatNumber = (v, precision, delimiter = '\'') => {
  // by default decimal precision is 2
  if (typeof (precision) === 'undefined') {
    precision = 2;
  }
  let nr = v;

  if (typeof (v) === 'string') {
    nr = v.replace(delimiter, '');
  }
  const pf = parseFloat(nr);

  if (isNaN(pf)) {
    return '';
  }

  var re = (precision > 0) ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g;
  return parseFloat(nr).toFixed(precision).replace(re, '$1\'');
};

/**
 * Format add decimals after comma depending on given precision
 * @param v: number
 * @param precision: precision (default: 2)
 * @return number with given precision
 */
const formatNumberMini = (v, precision) => {
  if (typeof (precision) === 'undefined') {
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
const formatKprice = v => {
  if (isNaN(v)) {
    return '';
  }
  // round value and separate thousands by comma of a round number
  return Math.round(v).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

/**
 * sums array made of numbers
 * @param arr: array of numbers
 */
const sum = arr => arr.reduce((a, b) => a + b);


/**
 * check if passed value is numeric
 * @param value: value to check
 * @return true/false
 */
const isNumeric = value => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
* Calculates the ratio based on two numbers
* @param a, b: numbers
* @return calculated value
*/
const calcRatio = (a, b) => {
  let r = 100 * a / b;
  if (isNaN(r)) {
    r = '';
  } else {
    r = formatNumber(r);
  }

  if (!isFinite(r)) {
    r = '\u221E';
  }
  return r;
};

/**
 * casts weirdly formatted numbers into float
 * @param  input string
 * @return float
 */
const toFloat = s => {
  if (!s || s === null || s === '') {
    return null;
  }

  return Number(s.replace(/[',]/g, ''));
}

export {formatNumber, formatNumberMini, formatKprice, sum, isNumeric, calcRatio, toFloat};
