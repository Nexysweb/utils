import Index from './index'
import * as IndexExport from './index'

test('exports', () => {  
  expect(typeof Index === 'object').toEqual(true)
  expect(typeof IndexExport.array === 'object').toEqual(true)
})

test('export color', () => {
  expect(typeof IndexExport.color === 'object').toEqual(true)
})

