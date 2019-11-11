import { paramsToString, deserialize, replaceParams, getGoogleMapsAddressLink, resolve } from './url';

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

test('getGoogleMapsAddressLink', () => {
  const address = { street: '1600 Amphitheatre Pkwy', city: 'Mountain View', zip: 94043, country: {name: 'United States'}};
  const url = 'https://www.google.com/maps/?q=1600%20Amphitheatre%20Pkwy%2094043%20Mountain%20View%20United%20States'
  expect(getGoogleMapsAddressLink(address)).toEqual(url);
})

test('url resolve', () => {
  const target = 'http://google.com';
  const uri = '/my/path';
  const r = resolve(target, uri);
  const e = 'http://google.com/my/path';

  expect(r).toEqual(e);
})