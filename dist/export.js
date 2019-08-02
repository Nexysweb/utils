"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _csvWriteStream = _interopRequireDefault(require("csv-write-stream"));

var _excel4node = _interopRequireDefault(require("excel4node"));

var _stream = require("stream");

/**
 * helper for excel and CSV exports
 */
var toCsv = function toCsv(rows, filename) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ",";
  var writer = (0, _csvWriteStream["default"])({
    separator: separator
  });
  ctx.status = 200;
  ctx.set('Content-Type', 'text/csv');
  ctx.set('Content-Disposition', 'attachment; filename=' + filename + '.csv');
  var headers = rows.shift();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var row = _step.value;
      var rowObj = {};

      for (var j = 0; j < row.length; j++) {
        rowObj[headers[j]] = row[j];
      }

      writer.write(rowObj);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return writer;
};
/**
 * creates xlsx from rows
 * @param  rows : array of arrays. Note that if the cell can be formatted by passing an objet instead of a string, e.g. {content: 'content of the string', color: 'red', bold: true}
 * @param worksheetName : name of the worksheet
 */


var toXls =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(rows, worksheetName) {
    var wb, ws, style;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wb = new _excel4node["default"].Workbook();
            ws = wb.addWorksheet(worksheetName);
            /**
             * helper function for defining style in xlsx (needs to be in function because of `wb`)
             * @param color : string "red"
             * @param bold : boolean
             * @return objec with style
             */

            style = function style(color, bold) {
              return wb.createStyle({
                font: {
                  color: color,
                  bold: bold
                }
              });
            }; // go through `rows`


            rows.map(function (row, i) {
              // go through `row`
              row.map(function (val, j) {
                var s = null;
                var cell = ws.cell(i + 1, j + 1);

                if ((0, _typeof2["default"])(val) === 'object' && val !== null) {
                  if (val.color) {
                    s = style(val.color);
                  }

                  if (val.bold) {
                    s = style('black', true);
                  }

                  if (val.href) {
                    href = val.href;
                  }

                  val = val.content;
                }

                if (typeof val === 'undefined' || isNaN(val) || val === '') {
                  // format as link
                  if (val.startsWith('http://') || val.startsWith('https://')) {
                    cell.link(val); // display string
                  } else {
                    cell.string(val);
                  } // display as number

                } else {
                  cell.number(Number(val));
                } // apply style, if any


                if (s) {
                  cell.style(s);
                }
              });
            });
            _context.next = 6;
            return wb.writeToBuffer();

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function toXls(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var toBok = function toBok(suite, title, heading) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  var alphabetRef = (0, _toConsumableArray2["default"])(alphabet);
  var readable = new _stream.Readable();

  readable._read = function () {}; // _read is required but you can noop it


  readable.push("".concat(heading, "\n\n\n"));
  suite.forEach(function (_ref2) {
    var questions = _ref2.questions,
        answers = _ref2.answers;
    var seriesLetter = alphabet.shift();
    questions.forEach(function (question, qIdx) {
      var qAnswers = answers[question.id];
      var label = question.label;
      var correctAnswers = qAnswers.map(function (answer, idx) {
        return {
          answer: answer,
          idx: idx
        };
      }).filter(function (a) {
        return a.answer.correct;
      }).map(function (a) {
        return alphabetRef[a.idx];
      }).join(",");
      var qHead = "[ITEM Name='".concat(title).concat(seriesLetter).concat(qIdx + 1, "' Type='MultipleChoice' Key='").concat(correctAnswers, "']\n");
      var qTitle = "".concat(label.trim(), "\n");
      readable.push(qHead);
      readable.push(qTitle);
      var alphabetAnswers = (0, _toConsumableArray2["default"])(alphabetRef);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = qAnswers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var answer = _step2.value;
          var answerLetter = alphabetAnswers.shift();
          var _label = answer.label;
          var qAnswer = "".concat(answerLetter, ". ").concat(_label.trim(), "\n");
          readable.push(qAnswer);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      readable.push('\n');
    });
  });
  readable.push(null);
  return readable;
};

var _default = {
  toCsv: toCsv,
  toXls: toXls,
  toBok: toBok
};
/*
  toXls: function(res, rows, filename, groupHides) {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet(filename);

    const style = (color, bold) => wb.createStyle({
      font: {
        color,
        bold,
      }
    });

    wb.write(filename + '.xlsx', res);

    for(var i=0; i<rows.length;i++) {
      var row = rows[i];

      for(var j=0; j<row.length;j++) {
        let val = row[j];
        let s = null;
        let href = null;

        if (typeof val === 'object' && val !== null) {
          if (val.color) {
            s = style(val.color);
          }

          if (val.bold) {
            s = style('black', true);
          }

          if (val.href) {
            href = val.href;
          }
          val =  val.content;
          
        }

        const cell = ws.cell(i+1, j+1);

        if (href) {
          cell.link(href, val);
        } else {

          if (isNaN(parseFloat(val)) || !isFinite(val)) {
            cell.string(val);
          } else {
            cell.number(Number(val));
          }
        }

        if (s) {
          cell.style(s);
        }

        // ws.cell(1, 1).string('My simple string');
        // ws.cell(1, 2).number(5);
        // ws.cell(1, 3).formula('B1 * 10');
        // ws.cell(1, 4).date(new Date());
        // ws.cell(1, 5).link('http://iamnater.com');
        // ws.cell(1, 6).bool(true);
      }
    }

    // will create a group and hide it
    const groupHideColumns = (start, end) => {
      for(i = start; i <= end; i++){
        ws.column(i).group(1, true)
      } 
    }

    if (typeof groupHides !== 'undefined' && Array.isArray(groupHides)) {
      // go thrugh all the hide groups
      groupHides.map(x => {
        groupHideColumns(x[0], x[1]);
      });
    }
  }
*/

exports["default"] = _default;