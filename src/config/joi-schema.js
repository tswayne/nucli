const Joi = require('joi')
const ConfigValidationError = require('./config-validation-error')

class JoiSchema {
  constructor(definition={}, strictMode=true) {
    this.strictMode = strictMode
    this.schema = Object.keys(definition).reduce((acc, key) => {
      const field = definition[key]
      acc[key] = field.type()
      if (field.required) { acc[key] = acc[key].required() }
      if (field.default) { acc[key] = acc[key].default(field.default)}
      return acc
    }, {})
  }

  validate(config) {
    const { value, error } = Joi.object(this.schema).validate(config, { abortEarly: false, allowUnknown: !this.strictMode })
    if (error) { throw new ConfigValidationError(error)}
    return value
  }
}


module.exports = JoiSchema
