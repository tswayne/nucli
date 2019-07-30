const Joi = require('@hapi/joi')

module.exports = {
  string: Joi.string,
  enum: (set=[]) => () => Joi.any().valid(...set),
  arrayEnum: (set=[]) => () => Joi.array().items(Joi.string().valid(...set))
}