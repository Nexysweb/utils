import * as Color from './color';

test('toRGBA', () => {
  expect(Color.toRGBA('#ffffff')).toEqual('rgba(255,255,255,1)')
})