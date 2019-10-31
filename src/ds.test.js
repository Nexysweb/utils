import { distinct, transpose, groupBy, unique, get, set, deserialize, removeProp, removeProps, updateObject, isEmpty, removePrefix, removeWhitespace, sortByProp } from './ds';

test('transpose', () => {
  const a = {a: {c: 'my ac', d: 'my ad'}, b: {c: 'my bc', d: 'my bd'}};
  const r = transpose(a);
  const e = {c: {a: 'my ac', b: 'my bc'}, d: {a: 'my ad', b: 'my bd'}}
  expect(r).toEqual(e);
});

test('transpose with fn', () => {
  const a = {a: {c: 11, d: 12}, b: {c: 21, d: 22}};
  const r = transpose(a, x => x + 100);
  const e = {c: {a: 111, b: 121}, d: {a: 112, b: 122}}
  expect(r).toEqual(e);
});

test('distinct', () => {
  const a = [1, 2, 3, 2, 1, 1, 1];
  const r = distinct(a);
  const e = [1, 2, 3];
  expect(r).toEqual(e);
});

/* does not work with objevts 
test('distinct with objects', () => {
  const a = [{name: 'elephant'}, {name: 'lion'}, {name: 'elephant'}, {name: 'leopard'}, {name: 'elephant'}, {name: 'wilderbeest'}, {name: 'rhinoceros'}];
  const r = distinct(a);
  const e = [{name: 'elephant'}, {name: 'lion'}, {name: 'leopard'} ,{name: 'wilderbeest'}, {name: 'rhinoceros'}];
  expect(r).toEqual(e);
});
*/

test('group by', () => {
  const value = [
    {a: 'first', v: 4},
    {a: 'first', v: 2},
    {a: 'second', v: 1},
    {a: 'second', v: 5}
  ];

  const e = {
    'first': [
      {a: 'first', v: 4},
      {a: 'first', v: 2}
    ],
    'second': [
      {a: 'second', v: 1},
      {a: 'second', v: 5}
    ]
  };

  expect(groupBy(value, 'a')).toEqual(e); 
});

test('deserialize', () => {
  const value = 'k1=v1,k2=v2';
  const e = { 'k2': 'v2', 'k1': 'v1'};
  expect(deserialize(value)).toEqual(e); 
});

test('unique', () => {
  const rows = [
    {ModuleId: 3},
    {ModuleId: 1},
    {ModuleId: 2},
    {ModuleId: 3}
  ];

  const r = unique(rows.map(e => e.ModuleId))

  expect(r).toEqual([3, 1, 2]);
});

test('get', () => {
  const p = "country.id";
  const data = {country: {id: 4}};

  expect(get(p, data)).toEqual(4)
});

test('remove prop', () => {
  const obj = {a: 'sdf', b: 'sd'};

  expect(removeProp(obj, 'b')).toEqual({a: 'sdf'})

});

test('remove prop', () => {
  const obj = {a: 'sdf', b: 'sd'};

  expect(removeProps(obj, ['a', 'b'])).toEqual({})
});

test('get', () => {
  const p = "country.id";
  const data = {country: {id: 4}};

  expect(get(p, data)).toEqual(4)
});

test('set', () => {
  const p = "country.id";
  const value = 4;
  const data = {city: 'Paris'};
  const data2 = {city: 'Paris', country: {id: 4}};

  expect(set(p, value, data)).toEqual(data2)
});

test('updateObject', () => {
  const form = {};
  const newObj = {name: 'myname', value: 'myvalue'};

  expect(updateObject(form, newObj)).toEqual({myname: 'myvalue'});
});

test('updateObject, 2d', () => {
  const form = {};
  const newObj = {name: 'myname.first', value: 'myvalue'};

  expect(updateObject(form, newObj)).toEqual({myname: {first : 'myvalue'}});
});

test('updateObject, 3d', () => {
  const form = {};
  const newObj = {name: 'myname.first.foo', value: 'myvalue'};

  expect(updateObject(form, newObj)).toEqual({myname: {first: {foo : 'myvalue'}}});
});

test('updateObject, 2d, with already existing', () => {
  const form = {myname: {second: 'mysecond'}};
  const newObj = {name: 'myname.first', value: 'myvalue'};

  expect(updateObject(form, newObj)).toEqual({myname: {first:  'myvalue', second: 'mysecond'}});
});

test('isempty', () => {
  const b = {a: 'sdf'};

  expect(isEmpty(b)).toEqual(false);
  expect(isEmpty({})).toEqual(true);
  expect(isEmpty(undefined)).toEqual(true);
});

test('remove prefix', () => {
  const a = {'prefix-a': 'sdf', 'prefix-b': 'qwe'};
  const b = {'a': 'sdf', 'b': 'qwe'};

  expect(removePrefix(a, 'prefix-')).toEqual(b);
});

test('sort by prop (1)', () => {
  const arr = [{name: 'Switzerland'}, {name: 'Germany'}];
  const asc = true;
  const attr = 'name';
  const s = sortByProp(arr, attr, asc);
  const e = [{name: 'Germany'}, {name: 'Switzerland'}];

  expect(s).toEqual(e);
});

test('sort by prop (2)', () => {
  const arr = [{name: 'France'}, {name: 'Switzerland'}, {name: 'Germany'}];
  const asc = false;
  const attr = 'name';
  const s = sortByProp(arr, attr, asc);
  const e = [{name: 'Switzerland'}, {name: 'Germany'}, {name: 'France'}];

  expect(s).toEqual(e);
});
