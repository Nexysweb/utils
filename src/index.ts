import * as array from './array';
import * as cast from './cast';
import * as curl from './curl';
import * as date from './date';
import * as ds from './ds';
import * as number from './number';
import * as random from './random';
import * as string from './string';
import * as url from './url';
import * as regex from './regex';
import * as color from './color';
<<<<<<< HEAD:src/index.js
import * as promise from './promise';
=======
import * as types from './types';
>>>>>>> 10031b84a7911e063143cb099040dfd49fd577fa:src/index.ts

const exportModules = {
  array,
  cast,
  curl,
  date,
  ds,
  number,
  promise,
  random,
  string,
  url,
  regex,
  types,
};

export {
  array,
  cast,
  curl,
  date,
  ds,
  number,
  promise,
  random,
  string,
  url,
  regex,
  color,
  types
};

export default exportModules;