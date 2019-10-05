import { paramsToString, deserialize, replaceParams } from './url';

test('paramsToString', () => {
  const params = {a: 'fd', b: 23};
  const e = 'a=fd&b=23';
  expect(paramsToString(params)).toEqual(e); 
});

test('deserialize', () => {
  const value = 'k1=v1,k2=v2';
  const e = { 'k2': 'v2', 'k1': 'v1'};
  expect(deserialize(value)).toEqual(e); 
});

test('replaceParams', () => {
  const urlOriginal = '/task/:taskId';
  const obj = {taskId: 45};

  const output = replaceParams(urlOriginal, obj);
  const outputExpected = '/task/45'; 

  expect(output).toEqual(outputExpected);
});