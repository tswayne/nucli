
class ConfigValidationError {
  constructor(error) {
    this.message = error.messages
    this.details = error.details
  }
}

module.exports = ConfigValidationError