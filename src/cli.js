const ParamParser = require('./params/param-parser')
const ConfigParser = require('./config/config-parser')
const CliError = require('./cli-error')

class Cli {
  constructor(options) {
    const { configDefinition, argsDefinition } = options
    try {
      this.args = new ParamParser(argsDefinition).fromArgv(process.argv)
      this.config = new ConfigParser(configDefinition).extract()
    } catch (error) {
      if (error instanceof CliError) {
        console.log(error.message)
      } else {
        console.log(`Runtime error: ${error}`)
        console.log(error.stack)
      }
      process.exit(1);
    }
  }

  run(method) {
    const options = { args: this.args, config: this.config }
    return method(options)
  }
}

module.exports = Cli