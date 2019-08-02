import Joi from 'joi';

/**
 * validate query that is used to query crud `/data` endpoint
 * @param body payload that is sent
 * @return true or false with and prints errors
 */
export const isCrud = (body) => {
  // to validate hashmap: https://github.com/hapijs/joi/issues/1294
  // lazy (for recursive validation): https://stackoverflow.com/questions/51477603/using-joi-how-to-define-recursive-array-of-objects-validation-with-n-depth
  const hashmapBoolean = Joi.object().pattern(/\w/, Joi.alternatives().try(Joi.boolean(), Joi.number(), Joi.string(), Joi.array(), Joi.lazy(() => hashmapBoolean)));

  const schema = Joi.object().pattern(/\w/, Joi.object().keys({
    params: hashmapBoolean.optional(),
    projection: hashmapBoolean.optional(),
    references: hashmapBoolean.optional(),
    filters: hashmapBoolean.optional(),
    take: Joi.number().optional(),
    skip: Joi.number().optional(),
    order: hashmapBoolean.optional()
  }));

  const validationOptions = {
    abortEarly: false, // do not stop after first error
    allowUnknown: false
  };

  const result = Joi.validate(body, schema, validationOptions);

  if (!result.error) {
    return true;
  } else {
    console.error(JSON.stringify(result.error));
    return false;
  }
}

export const isSchema = (body, ddl) => {
  const allEntities = Object.keys(body).map(k => {
    const entity = ddl.find(x => x.name === k);

    if (entity) {
      return true;
    }

    return false;
  });

  return allEntities.reduce((x, y) => !(!x || !y));
}

export default { isCrud };