import * as DSUtils from './ds';


test('transpose', () => {
  const a = {a: {c: 'my ac', d: 'my ad'}, b: {c: 'my bc', d: 'my bd'}};
  const r = DSUtils.transpose(a);
  const e = {c: {a: 'my ac', b: 'my bc'}, d: {a: 'my ad', b: 'my bd'}}
  expect(r).toEqual(e);
});

test('transpose with fn', () => {
  const a = {a: {c: 11, d: 12}, b: {c: 21, d: 22}};
  const r = DSUtils.transpose(a, x => x + 100);
  const e = {c: {a: 111, b: 121}, d: {a: 112, b: 122}}
  expect(r).toEqual(e);
});

test('distinct', () => {
  const a = [1, 2, 3, 2, 1, 1, 1];
  const r = DSUtils.distinct(a);
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

  expect(DSUtils.groupBy(value, 'a')).toEqual(e); 
});

test('deserialize', () => {
  const value = 'k1=v1,k2=v2';
  const e = { 'k2': 'v2', 'k1': 'v1'};
  expect(DSUtils.deserialize(value)).toEqual(e); 
});

test('deserialize (2)', () => {
  const value = 'k1v1';
  expect(DSUtils.deserialize(value)).toEqual({}); 
})

test('unique', () => {
  const rows = [
    {ModuleId: 3},
    {ModuleId: 1},
    {ModuleId: 2},
    {ModuleId: 3}
  ];

  const r = DSUtils.sortByProp(rows, 'ModuleId');
  expect(DSUtils.unique(r, 'ModuleId')).toEqual([{ModuleId: 1}, {ModuleId: 2}, {ModuleId: 3}]);
});

test('get', () => {
  const p = "country.id";
  const data = {country: {id: 4}};

  expect(DSUtils.get(p, data)).toEqual(4);
});

test('get - return null', () => {
  const p = "country.id";
  const data = {country: 'France'};

  expect(DSUtils.get(p, data)).toEqual(null);
});

test('get - prop 0 / false', () => {
  const p = 'test';
  let data = {test: 0};

  expect(DSUtils.get(p, data)).toEqual(0);

  data = {test: false};
  expect(DSUtils.get(p, data)).toEqual(false);
});

test('keep props', () => {
  const obj = { asdf: 'ghjk', test: 'me', hello: 'world'};

  expect(DSUtils.keepProps(obj, ['test', 'hello'])).toEqual({test: 'me', hello: 'world'});
})

test('remove prop', () => {
  const obj = {a: 'sdf', b: 'sd'};

  expect(DSUtils.removeProp(obj, 'b')).toEqual({a: 'sdf'})

});

test('remove prop', () => {
  const obj = {a: 'sdf', b: 'sd'};

  expect(DSUtils.removeProps(obj, ['a', 'b'])).toEqual({})
});

test('get', () => {
  const p = "country.id";
  const data = {country: {id: 4}};

  expect(DSUtils.get(p, data)).toEqual(4)
});

test('set', () => {
  const p = "country.id";
  const value = 4;
  const data = {city: 'Paris'};
  const data2 = {city: 'Paris', country: {id: 4}};

  expect(DSUtils.set(p, value, data)).toEqual(data2)
});

test('updateObject', () => {
  const form = {};
  const newObj = {name: 'myname', value: 'myvalue'};

  expect(DSUtils.updateObject(form, newObj)).toEqual({myname: 'myvalue'});
});

test('updateObject, 2d', () => {
  const form = {};
  const newObj = {name: 'myname.first', value: 'myvalue'};

  expect(DSUtils.updateObject(form, newObj)).toEqual({myname: {first : 'myvalue'}});
});

test('updateObject, 3d', () => {
  const form = {};
  const newObj = {name: 'myname.first.foo', value: 'myvalue'};

  expect(DSUtils.updateObject(form, newObj)).toEqual({myname: {first: {foo : 'myvalue'}}});
});

test('updateObject, 2d, with already existing', () => {
  const form = {myname: {second: 'mysecond'}};
  const newObj = {name: 'myname.first', value: 'myvalue'};

  expect(DSUtils.updateObject(form, newObj)).toEqual({myname: {first:  'myvalue', second: 'mysecond'}});
});

test('isempty', () => {
  const b = {a: 'sdf'};

  expect(DSUtils.isEmpty(b)).toEqual(false);
  expect(DSUtils.isEmpty({})).toEqual(true);
  expect(DSUtils.isEmpty(undefined)).toEqual(true);
});

test('remove prefix', () => {
  const a = {'prefix-a': 'sdf', 'prefix-b': 'qwe'};
  const b = {'a': 'sdf', 'b': 'qwe'};

  expect(DSUtils.removePrefix(a, 'prefix-')).toEqual(b);
});

test('lower', () => {
  expect(DSUtils.lower(2)).toEqual(2);
  expect(DSUtils.lower('Jkl')).toEqual('jkl');
  expect(DSUtils.lower('')).toEqual('');
})

test('sort by prop (1)', () => {
  const arr = [{name: 'Switzerland'}, {name: 'Germany'}];
  const asc = true;
  const attr = 'name';
  const s = DSUtils.sortByProp(arr, attr, asc);
  const e = [{name: 'Germany'}, {name: 'Switzerland'}];

  expect(s).toEqual(e);
});

test('sort by prop (2)', () => {
  const arr = [{name: 'France'}, {name: 'Switzerland'}, {name: 'Germany'}];
  const asc = false;
  const attr = 'name';
  const s = DSUtils.sortByProp(arr, attr, asc);
  const e = [{name: 'Switzerland'}, {name: 'Germany'}, {name: 'France'}];

  expect(s).toEqual(e);
});

test('compare object - return 0', () => {
  const a = {name: 'Germany', misc: 'misc1'};
  const b = {name: 'Germany', misc: 'misc1'};
  const attr = 'name';

  const r = DSUtils.compareObj(a, b, attr);

  expect(r).toEqual(0);
});

test('compare object - return 0', () => {
  const a = {name: 'France', misc: 'misc1'};
  const b = {name: 'Germany', misc: 'misc1'};
  const attr = 'name';

  const r1 = DSUtils.compareObj(a, b, attr);
  expect(r1).toEqual(-1);
  const r2 = DSUtils.compareObj(b, a, attr);
  expect(r2).toEqual(1);
});

test('compare object - missing input', () => {
  const a = {name: 'France', misc: 'misc1'};
  const b = { misc: 'misc1'};
  const attr = 'name';

  const r1 = DSUtils.compareObj(a, b, attr);
  expect(r1).toEqual(0);
});

test('hasProp', () => {
  expect(DSUtils.hasProp({a: 'a value'}, 'a')).toEqual(true);
  expect(DSUtils.hasProp({a: 'a value'}, 'b')).toEqual(false);
});

test('nest', () => {
  const result = DSUtils.nest({'profile.firstName': 'test', 'profile.lastName': 'test2'});

  expect(result).toEqual({
    profile: {
      firstName: 'test',
      lastName: 'test2'
    }
  });
});

test('nest empty', () => {
  const result = DSUtils.nest([]);

  expect(result).toEqual({});
});

test('nest value false', () => {
  const result = DSUtils.nest([
    { key: 'reason', value: 'revoked' },
    { key: 'suppress_revoke_notification_email', value: false }
  ]);

  expect(result).toEqual({
    reason: 'revoked',
    suppress_revoke_notification_email: false
  });
});

test('deep merge', () => {
  const a = {
    a: {
      b: {
        c: 'testc',
        f: {
          g: 'testg'
        }
      }
    }
  };

  const b = {
    a: {
      b: {
        e: 'teste'
      },
      d: 'testd'
    }
  };

  expect(DSUtils.deepMerge(a, b)).toEqual({
    a: {
      b: {
        c: 'testc',
        f: {
          g: 'testg'
        },
        e: 'teste'
      },
      d: 'testd'
    }
  });
});

test('deep merge 2', () => {
  const data = {
    data: []
  };

  const metadata = {
    metadata: {
      count: 0,
      current_page: 1,
      total_count: 0,
      total_pages: 1,
      per: 50,
      previous_page_url: null,
      next_page_url: null
    }
  };

  expect(DSUtils.deepMerge(data, metadata)).toEqual({
    data: [],
    metadata: {
      count: 0,
      current_page: 1,
      total_count: 0,
      total_pages: 1,
      per: 50,
      previous_page_url: null,
      next_page_url: null
    }
  });
});

test('linearize', () => {
  const data = {
    profile: {
      firstName: 'test',
      lastName: 'test2'
    },
    email: 'test@test'
  };

  const result = DSUtils.linearize(data);

  const output = [
    { key: 'profile.firstName', value: 'test' },
    { key: 'profile.lastName', value: 'test2' },
    { key: 'email', value: 'test@test' }
  ];

  expect(result).toEqual(output);
});

test('getLinearizedKeys', () => {
  const obj = {k1: 'v1', k2: {k21: 'v21', k22: 'v22'}, k3: 'v3'};
  const out = ['k1', 'k2.k21', 'k2.k22', 'k3'];

  expect(DSUtils.getLinearizedKeys(obj)).toEqual(out);
});