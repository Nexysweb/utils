import {arrayBooleanToInt, sumArrayBoolean, isObjectInArray, isObjectAttrInArray, createArrayOfLength, flattenArray, sortArrayByAttribute, getArrayLastNElements } from './array';

import * as ArrayLib from './array';

test('arrayBooleanToInt', () => {
  const a = [false, true, true];

  const r = arrayBooleanToInt(a);

  const e = [0, 1, 1];

  expect(r).toEqual(e);
});

test('sumArrayBoolean', () => {
  const a = [false, true, true];

  const r = sumArrayBoolean(a);

  const e = 2;

  expect(r).toEqual(e);
})

test('isObjectInArray', () => {
  const obj3 = {fruit: 'pear', animal: 'leopard'};
  const obj4 = {fruit: 'pear', animal: 'leopardy'};
  const a = [{fruit: 'apple', animal: 'lion'}, {fruit: 'banana', animal: 'elephant'}, obj3];

  const r = isObjectInArray(obj3, a);
  const r2 = isObjectInArray(obj4, a);

  const e = 2;

  expect(r).toEqual(e);
  expect(r2).toEqual(null);
});

test('isObjectAttrInArray', () => {
  const obj3 = {fruit: 'pear', animal: 'leopard'};
  const a = [{fruit: 'apple', animal: 'lion'}, {fruit: 'banana', animal: 'elephant'}, obj3];

  const r = isObjectAttrInArray('pear', a, 'fruit');
  const r2 = isObjectAttrInArray('pear2', a, 'fruit');

  const e = 2;

  expect(r).toEqual(e);
  expect(r2).toEqual(null);
});

test('createArrayOfLength', () => {
  expect(createArrayOfLength(3)).toEqual([1, 2, 3]);
  expect(createArrayOfLength(3, 4)).toEqual([4, 5, 6]);
});

test('flattenArray', () => {
  const a = [1, [2, 3, 4]]
  const r = flattenArray(a);
  const e = [1,2, 3, 4];

  expect(r).toEqual(e);
});

test('sortArrayByAttribute', () => {
  const obj1 = {fruit: 'apple', animal: 'lion'};
  const obj2 = {fruit: 'banana', animal: 'elephant'};
  const obj3 = {fruit: 'pear', animal: 'leopard'};
  const arr = [obj1, obj2, obj3];
  const r = sortArrayByAttribute(arr, 'animal');
  const e = [obj2, obj3, obj1];

  expect(r).toEqual(e);
});

test('getArrayLastNElements', () => {
  const a = [1, 2,3,4, 5, 6, 7, 8];
  const e = [6, 7, 8];
  const r = getArrayLastNElements(a,3);

  expect(r).toEqual(e);
});

test('isNestedObjectAttrInArray', () => {
  const k = 7;
  const arr = [{country: {id: 4}}, {country: {id: 6}}, {country: {id: 7}}];
  const nest = 'country';
  const r = ArrayLib.isNestedObjectAttrInArray(k, arr, nest);

  expect(r).toEqual(2);
});

test('compareArrayEntriesDepth', () => {
  const a = {name: 'France'};
  const b = {name: 'Germany'};
  const attr = 'name';

  const r = ArrayLib.compareArrayEntriesDepth(a, b, attr);

  expect(r).toEqual(-1);
});

test('compareArrayEntries', () => {
  const a = 'one';
  const b = 'two';

  expect(ArrayLib.compareArrayEntries(a, b)).toEqual(-1)
});

test('compareArrayEntriesWattr', () => {
  const a = {name: 'France'};
  const b = {name: 'Germany'};
  const attr = 'name';

  expect(ArrayLib.compareArrayEntriesWAttr(a, b, 'name')).toEqual(-1)
});

test('isValueInArray', () => {
  const array = [{id: 3}, {id: 5}];
  const value = 5;

  expect(ArrayLib.isValueInArray(array, value)).toEqual({id: 5});
});

test('findArrayIndexOfValue', () => {
  const array = [3, 5];
  const value = 5;
  expect(ArrayLib.findArrayIndexOfValue(array, value)).toEqual(1);
  expect(array.indexOf(value)).toEqual(1);
});

test('findArrayIndexOfValueByAttr', () => {
  const array = [{id: 3}, {id: 5}];
  const value = 5;
  expect(ArrayLib.findArrayIndexOfValueByAttr(array, value)).toEqual(1);
  expect(array.map(_ => _.id).indexOf(value)).toEqual(1);
});

test('shuffle - integers', () => {
  const a = [1, 2, 3, 4, 5];
  const s = ArrayLib.shuffle(a);

  const aSorted = s.map(x => JSON.stringify(x)).sort();
  const sSorted = s.map(x => JSON.stringify(x)).sort();

  expect(JSON.stringify(aSorted)).toEqual(JSON.stringify(sSorted));
});

test('shuffle - objects', () => {
  const a = [{id: 3, name: 'France'}, {id: 1, name: 'Austria'}, {id: 4, name: 'Germany'}, {id: 2, name: 'Italy'}, {id: 5, name: 'Switzerland'}];
  const s = ArrayLib.shuffle(a);

  const aSorted = s.map(x => JSON.stringify(x)).sort();
  const sSorted = s.map(x => JSON.stringify(x)).sort();

  expect(JSON.stringify(aSorted)).toEqual(JSON.stringify(sSorted));
});