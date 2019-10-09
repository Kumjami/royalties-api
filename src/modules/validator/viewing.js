const joi = require('@hapi/joi');

const schema = joi.object({
  episode: joi.string().required(),
  customer: joi.string().required(),
});

module.exports.validate = (body) => {
  const { error, value } = schema.validate(body);
  if (error) throw error;
  return value;
};
