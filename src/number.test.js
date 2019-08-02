import { formatNumber, formatNumberMini, formatKprice, sum, isNumeric, calcRatio, toFloat } from './number';

test('format', () => {
  expect(formatNumber(23.1234)).toEqual('23.12');
});

test('format mini', () => {
  expect(formatNumberMini(23.1234)).toEqual('23.12');
});

test('formatKprice', () => {
  expect(formatKprice(5423.1234)).toEqual('5,423');
});

test('sum', () => {
  // sum n = n(n+1)/2
  expect(sum([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(9*10/2);
});

test('isNumeric', () => {
  expect(isNumeric(34)).toEqual(true);
  expect(isNumeric('34')).toEqual(true);
  expect(isNumeric(null)).toEqual(false);
  expect(isNumeric('null')).toEqual(false);
});

test('calcRatio', () => {
  expect(calcRatio(6,10)).toEqual('60.00');
});

test('tofloat', () => {
  expect(toFloat('23.43')).toEqual(23.43);
});

