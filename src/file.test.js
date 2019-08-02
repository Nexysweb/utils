import path from 'path';
import FileUtil from './file';

test('get file content', async () => {
  const filepath = path.join(__dirname, './sample.csv');
  const r = await FileUtil.getContent(filepath);

  expect(r.substr(0,5)).toEqual('Measu')
});