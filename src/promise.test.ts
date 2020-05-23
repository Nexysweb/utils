import * as P from './promise';

test('delay', async () => {
  const ms = 100;
  const t0 = performance.now()
  await P.delay(ms)
  const t1 = performance.now();

  expect(ms).toBeLessThanOrEqual(t1-t0)
})