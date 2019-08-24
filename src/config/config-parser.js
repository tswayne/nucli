const fs = require('fs')
const ConfigValidationError = require('./config-validation-error')
const CliError = require('../cli-error')
const JoiSchema = require('./joi-schema')

const DEFAULT_PATH = './'

class ConfigParser {

  constructor(definition={}) {
    this.definition = definition
    this.schema = new JoiSchema(definition.fields, definition.strictMode)
  }

  extract() {
    try {
      if (!this.definition.fields) { return {} }
      const config = this._locate()
      return this._validate(config)
    } catch(error) {
      if (!error instanceof ConfigValidationError ) { throw error }
      const validationErrorMessages = error.details.map(detail => detail.message).join('\n')
      throw new CliError('Configuration error: \n' + validationErrorMessages)
    }
  }

  _validate(config) {
    return this.schema.validate(config)
  }

  _locate() {
    const { configFilePath=DEFAULT_PATH, configFileName } = this.definition
    const file = configFilePath + configFileName
    if (!fs.existsSync(file)) { return {} }
    return JSON.parse(fs.readFileSync(file))
  }
}

module.exports = ConfigParser

