/**
 * parse number into formatted number
 * @param v: number
 * @param p: precision
 * @param delimiter: thousand separator, default " ' "
 * @see http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
 */
const formatNumber = (v:number, precision:number = 2, delimiter:string = '\''):string => {
  //let nr:string = v;

  /*if (typeof (v) === 'string') {
    nr = (v.replace(delimiter, ''));
  }
  const pf = parseFloat(nr);*/

  const pf = v;

  if (isNaN(pf)) {
    return '';
  }

  const re = (precision > 0) ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g;
  return pf.toFixed(precision).replace(re, '$1\'');
};

/**
 * Format add decimals after comma depending on given precision
 * @param v: number
 * @param precision: precision (default: 2)
 * @return number with given precision
 */
const formatNumberMini = (v:number, precision:number = 2):string => {
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
const formatKprice = (v:number):string => {
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
const sum = (arr:number[]):number => arr.reduce((a, b) => a + b, 0);

/**
 * check if passed value is numeric
 * @param value: value to check
 * @return true/false
 */
const isNumeric = (value:any):boolean => !isNaN(parseFloat(value)) && isFinite(value);

/**
* Calculates the ratio based on two numbers
* @param a, b: numbers
* @return calculated value
*/
const calcRatio = (a:number, b:number):string => {
  const r = 100 * a / b;

  let t = '';

  if (isNaN(r)) {
    t = '';
  } else {
    t = formatNumber(r);
  }

  if (!isFinite(r)) {
    t = '\u221E';
  }
  return t;
};

/**
 * casts weirdly formatted numbers into float
 * @param  input string
 * @return float
 */
const toFloat = (s:string):number => {
  if (!s || s === null || s === '') {
    return NaN;
  }

  return Number(s.replace(/[',]/g, ''));
}

export {formatNumber, formatNumberMini, formatKprice, sum, isNumeric, calcRatio, toFloat};
