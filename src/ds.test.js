import { distinct, transpose, groupBy, unique, get, deserialize } from './ds';


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

