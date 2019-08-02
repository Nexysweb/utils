/**
 * 
 * helper functions for working with files 
 */
const fs = require('fs').promises;

const encoding = 'utf8'

/**
 * @return file content
 * @param filepath : [ath of the file]
 */
const getContent = async filepath =>  await fs.readFile(filepath, encoding);

export default { getContent };