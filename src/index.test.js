import Index from './index'
import { array } from './index'

test('exports', () => {  
  expect(typeof Index === 'object').toEqual(true)
  expect(typeof array === 'object').toEqual(true)
})

