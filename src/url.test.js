import { paramsToString, deserialize, replaceParams, getGoogleMapsAddressLink, resolve } from './url';

import * as Url from './url';

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
  const target = 'http://google.com/';
  const uri = '/my/path';
  const r0 = resolve(target, uri);
  const e0 = 'http://google.com/my/path';

  expect(r0).toEqual(e0);

  // https://nodejs.org/api/url.html#url_url_resolve_from_to
  const r1 = resolve('/one/two/three', 'four');         
  const e1 = '/one/two/four';
  expect(r1).toEqual(e1);
  const r2 = resolve('http://example.com/', '/one');    // ''
  const e2 = 'http://example.com/one'
  expect(r2).toEqual(e2);
  const r3 = resolve('http://example.com/one', '/two'); // ''
  const e3 = 'http://example.com/two';
  expect(r3).toEqual(e3);
});

test('url resolve 2', () => {
  const target = 'http://google.com';
  const uri = '/my/path';
  const r0 = resolve(target, uri);
  const e0 = 'http://google.com/my/path';

  expect(r0).toEqual(e0);
});

test('getQueryStringParams', () => {
  const query = '?arg1=v1&arg2=v2&arg3=v3';
  const params = {arg1: 'v1', arg2: 'v2', arg3: 'v3'};
  expect(Url.getQueryStringParams(query)).toEqual(params)
})
