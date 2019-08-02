"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isSchema = exports.isCrud = void 0;

var _joi = _interopRequireDefault(require("joi"));

/**
 * validate query that is used to query crud `/data` endpoint
 * @param body payload that is sent
 * @return true or false with and prints errors
 */
var isCrud = function isCrud(body) {
  // to validate hashmap: https://github.com/hapijs/joi/issues/1294
  // lazy (for recursive validation): https://stackoverflow.com/questions/51477603/using-joi-how-to-define-recursive-array-of-objects-validation-with-n-depth
  var hashmapBoolean = _joi["default"].object().pattern(/\w/, _joi["default"].alternatives()["try"](_joi["default"]["boolean"](), _joi["default"].number(), _joi["default"].string(), _joi["default"].array(), _joi["default"].lazy(function () {
    return hashmapBoolean;
  })));

  var schema = _joi["default"].object().pattern(/\w/, _joi["default"].object().keys({
    params: hashmapBoolean.optional(),
    projection: hashmapBoolean.optional(),
    references: hashmapBoolean.optional(),
    filters: hashmapBoolean.optional(),
    take: _joi["default"].number().optional(),
    skip: _joi["default"].number().optional(),
    order: hashmapBoolean.optional()
  }));

  var validationOptions = {
    abortEarly: false,
    // do not stop after first error
    allowUnknown: false
  };

  var result = _joi["default"].validate(body, schema, validationOptions);

  if (!result.error) {
    return true;
  } else {
    console.error(JSON.stringify(result.error));
    return false;
  }
};

exports.isCrud = isCrud;

var isSchema = function isSchema(body, ddl) {
  var allEntities = Object.keys(body).map(function (k) {
    var entity = ddl.find(function (x) {
      return x.name === k;
    });

    if (entity) {
      return true;
    }

    return false;
  });
  return allEntities.reduce(function (x, y) {
    return !(!x || !y);
  });
};

exports.isSchema = isSchema;
var _default = {
  isCrud: isCrud
};
exports["default"] = _default;