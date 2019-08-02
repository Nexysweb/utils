"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _file = _interopRequireDefault(require("./file"));

test('get file content',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  var filepath, r;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          filepath = _path["default"].join(__dirname, './sample.csv');
          _context.next = 3;
          return _file["default"].getContent(filepath);

        case 3:
          r = _context.sent;
          expect(r.substr(0, 5)).toEqual('Measu');

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));