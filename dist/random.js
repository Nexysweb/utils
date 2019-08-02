"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @see https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * @param len: length of generated strings
 * @return random generated strings
 */
var generateString = function generateString(len) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

var _default = {
  generateString: generateString
};
exports["default"] = _default;