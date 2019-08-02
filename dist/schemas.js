"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("joi"));

// todo move to controller
var objectivesSchema = _joi["default"].object().keys({
  title: _joi["default"].string().required().label('Title'),
  mandatory: _joi["default"].number().max(1).required().label('Mandatory'),
  businessPartnerTypeId: _joi["default"].number().required().label('BP Type'),
  minLength: _joi["default"].number().required().label('Minimum length'),
  helper: _joi["default"].string().allow('').label('Helper')
})["with"]('title', ['mandatory', 'businessPartnerTypeId', 'minLength']);

var businesspartnerlinkSchema = _joi["default"].object().keys({
  businessPartner: _joi["default"].object().keys({
    id: _joi["default"].number().label('Business Partner')
  }).requiredKeys('id').required(),
  entityTypeId: _joi["default"].number().required(),
  link: _joi["default"].string().required().label('Link')
})["with"]('businessPartner', ['entityTypeId', 'link']);

var bpuserSchema = _joi["default"].object().keys({
  typeId: _joi["default"].number().allow('').label('Key BP Function'),
  firstName: _joi["default"].string().required().label('First Name'),
  lastName: _joi["default"].string().required().label('Last Name'),
  email: _joi["default"].string().email().required()
})["with"]('typeId', ['firstName', 'lastName', 'email']); // exports in the view { <entity name>: <schema name> }


module.exports = {
  objectivequestion: objectivesSchema,
  businesspartnerlink: businesspartnerlinkSchema,
  bpuser: bpuserSchema
};