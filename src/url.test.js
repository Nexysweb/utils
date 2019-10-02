import { paramsToString } from './url';

test('paramsToString', () => {
  const params = {a: 'fd', b: 23};
  const e = 'a=fd&b=23';
  expect(paramsToString(params)).toEqual(e); 
});