import {readableFileSize, padding, contains, parseName, capitalize} from './string';

test('padding', () => {
  const e = '00034';
  const m = '34';
  const width = 5;
  const z = '0';
  expect(padding(m, width, z)).toEqual(e); 
});

test('contains', () => {
  expect(contains('string', 'str')).toEqual(true); 
});

test('parse name', () => {
  expect(parseName('[0].lesson')).toEqual({i: "0", key: 'lesson'}); 
  expect(parseName('[1].owner')).toEqual({i: "1", key: 'owner'}); 
});

test('capitalize', () => {
  expect(capitalize('lesson')).toEqual('Lesson'); 
});

test('readableFileSize', () => {
  expect(readableFileSize(568749)).toEqual('555.42 KB');
});