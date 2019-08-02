// todo move to controller
import Joi from 'joi';

const objectivesSchema = Joi.object().keys({
  title: Joi.string().required().label('Title'),
  mandatory: Joi.number().max(1).required().label('Mandatory'),
  businessPartnerTypeId: Joi.number().required().label('BP Type'),
  minLength: Joi.number().required().label('Minimum length'),
  helper: Joi.string().allow('').label('Helper')
}).with('title', ['mandatory', 'businessPartnerTypeId', 'minLength']);

const businesspartnerlinkSchema = Joi.object().keys({
  businessPartner: Joi.object().keys({id: Joi.number().label('Business Partner')}).requiredKeys('id').required(),
  entityTypeId: Joi.number().required(),
  link: Joi.string().required().label('Link')
}).with('businessPartner', ['entityTypeId', 'link']);

const bpuserSchema = Joi.object().keys({
  typeId: Joi.number().allow('').label('Key BP Function'),
  firstName: Joi.string().required().label('First Name'),
  lastName: Joi.string().required().label('Last Name'),
  email: Joi.string().email().required()
}).with('typeId', ['firstName', 'lastName', 'email']);

// exports in the view { <entity name>: <schema name> }
module.exports = { 
  objectivequestion: objectivesSchema,
  businesspartnerlink: businesspartnerlinkSchema,
  bpuser: bpuserSchema
};