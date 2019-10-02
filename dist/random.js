"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.generateString = void 0;

/**
 * @see https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * @param len: length of generated strings
 * @return random generated strings
 */
var generateString = function generateString() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

exports.generateString = generateString;
var _default = {
  generateString: generateString
};
exports["default"] = _default;