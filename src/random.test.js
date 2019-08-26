import { generateString } from './random';

test('generate strings', () => {
  const l = 12;
  const r = generateString(l);

  expect(r.length).toEqual(l);
})