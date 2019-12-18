import { promises as file } from 'fs';


file.exists = path => file.stat(path).catch(err => {
  if (err.code === "ENOENT") return false;
  throw err;
});

file.dirExists = async path => {
  const exists = await file.exists(path);
  if (!exists) {
    await fs.mkdir(path, { recursive: true });
  }

  return true;
}

/**
 * @return file content
 * @param filepath: [path of the file]
 */
file.getContent = (filepath, encoding='utf8') => file.readFile(filepath, encoding);


module.exports = file;