const commander = require('commander')

class ParamParser {
  constructor(config={}) {
    this.config = config
  }

  fromArgv(rawArgs) {
    if (!this.config.fields) { return {} }
    const args = this._parse(rawArgs)
    return this._hydrate(args)
  }

  _hydrate(args) {
    return Object.keys(this.config.fields).reduce((acc, key) => {
      acc[key] = args[key] || this.config.fields[key].default
      return acc
    }, {})
  }

  _parse(rawArgs) {
    const version = this.config.cliVersion || 1
    commander
      .version(version, '-v, --version')

    Object.keys(this.config.fields).forEach(key => {
      const paramConfig = this.config.fields[key]
      let flags = `${paramConfig.shortHand}, --${key}`
      if (paramConfig.options) { flags = `${flags} [${paramConfig.options}]` }

      commander.option(flags, paramConfig.description, paramConfig.type)
    })

    return commander.parse(rawArgs)
  }
}

module.exports = ParamParser
