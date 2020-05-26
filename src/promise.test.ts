import * as P from './promise';
// https://stackoverflow.com/questions/46436943/referenceerror-performance-is-not-defined-when-using-performance-now
import {performance} from 'perf_hooks';

test('delay', async () => {
  const ms = 100;
  const t0 = performance.now()
  await P.delay(ms)
  const t1 = performance.now();

  expect(ms).toBeLessThanOrEqual(t1-t0)
})