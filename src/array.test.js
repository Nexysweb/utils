import {arrayBooleanToInt, sumArrayBoolean, isObjectInArray, isObjectAttrInArray, createArrayOfLength, flattenArray, sortArrayByAttribute, getArrayLastNElements } from './array';

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
})