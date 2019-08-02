import Error from './error';
import { isError } from './error';

const message = 'something went wrong';
const statusCode = 500;
const myError = new Error(message, statusCode);

test('check if input is an error', () => {
  class ARandomClass {};
  const myRandomClass = new ARandomClass;

  // typof always returns `object`
  // console.log(typeof e)

  expect(myError instanceof Error).toEqual(true);
  expect('mystring' instanceof Error).toEqual(false);
  expect(myRandomClass instanceof Error).toEqual(false);

  expect(isError(myError)).toEqual(true);
  expect(isError(myRandomClass)).toEqual(false);
  expect(isError('myString')).toEqual(false);

  console.log(myError.message)
});

test('iserror attribute works', ()=> {
  expect(myError.isError).toEqual(true);
})

test('attributes are being saved', () => {
  expect(myError.message).toEqual(message);
  expect(myError.statusCode).toEqual(statusCode);
});

test('default atttributes', () => {
  const defaultError = new Error();
  expect(defaultError.message).toEqual(null);
  expect(defaultError.statusCode).toEqual(400);
});


