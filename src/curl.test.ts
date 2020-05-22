import * as C from './curl';

describe('cURL generation from metadata', () => {
  test('simple', () => {
    const options:C.Options = {url: 'http://myurl.com'}
    const out:string = 'curl http://myurl.com';

    expect(C.curl(options)).toEqual(out)
  })

  test('post', () => {
    const options:C.Options = {url: 'http://myurl.com', method: 'POST'}
    const out:string = 'curl -X POST http://myurl.com';

    expect(C.curl(options)).toEqual(out)
  })

  test('post w headers', () => {
    const headers = {'Content-Type': 'application/json'}
    const options:C.Options = {url: 'http://myurl.com', method: 'POST', headers}
    const out:string = `curl -H "Content-Type: application/json" -X POST http://myurl.com`;

    expect(C.curl(options)).toEqual(out)
  })

  test('post w headers w file', () => {
    const headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer myauthtoken'}
    const options:C.Options = {url: 'http://myurl.com', method: 'POST', headers, file: 'model.json'}
    const out:string = `curl -H "Content-Type: application/json" -H "Authorization: Bearer myauthtoken" -X POST --data @model.json http://myurl.com`;

    expect(C.curl(options)).toEqual(out)
  })
})