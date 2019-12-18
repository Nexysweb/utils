import path from 'path';
import file from './index';

test('get file content', async () => {
  const filepath = path.join(__dirname, './sample.csv');
  const r = await file.getContent(filepath);

  expect(r.substr(0,5)).toEqual('Measu')
});