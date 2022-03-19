const Joi = require('joi')

module.exports = {
  string: Joi.string,
  enum: (set=[]) => () => Joi.any().valid(...set),
  object: Joi.object,
  boolean: Joi.boolean,
  array: Joi.array,
  arrayEnum: (set=[]) => () => Joi.array().items(Joi.string().valid(...set))
}
