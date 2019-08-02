import Util from './index';

const { get, groupBy, padding, unique, formatDate, deserialize, paramsToString, parseEnvVar } = Util;

test('deserialize', () => {
  const value = 'k1=v1,k2=v2';
  const e = { 'k2': 'v2', 'k1': 'v1'};
  expect(deserialize(value)).toEqual(e); 
});

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
})

test('paramsToString', () => {
  const params = {a: 'fd', b: 23};
  const e = 'a=fd&b=23';
  expect(paramsToString(params)).toEqual(e); 
});

test('padding', () => {
  const e = '00034';
  const m = '34';
  const width = 5;
  const z = '0';
  expect(padding(m, width, z)).toEqual(e); 
});

test('formatDate', () => {
  const d = new Date('2019-09-04');

  expect(formatDate(d)).toEqual('04.09.2019')
});

test('parseEnvVar', () => {
  const value = 'fd="gfds"';
  const e = 'fd="gfds"';
  expect(parseEnvVar(value)).toEqual(e); 
});

test('get', () => {
  const p = "country.id";
  const data = {country: {id: 4}};

  expect(get(p, data)).toEqual(4)
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