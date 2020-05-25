const { createLogger, format, transports } = require('winston')
const appRoot = require('app-root-path')
const { combine, timestamp } = format
const chalk = require('chalk')

// https://github.com/winstonjs/winston/tree/master/examples

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info, opts) => {
  if (info.private) { return false }
  return info
})

const options = {
  file: {
    level: process.env.LOG_LEVEL || 'silly',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      format.simple(),
      ignorePrivate(),
    ),
    // format: combine(
    //   format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    // ),
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,

  },
  console: {
    level: process.env.LOG_LEVEL || 'silly',
    handleExceptions: true,
    // prettyPrint: true,
    format: combine(
      format.align(),
      format.padLevels(),
      format.splat(),
      // format.simple(),
      format.colorize({ all: false, level: true, message: true }),
      // label({ label: path.basename(process.mainModule.filename) }),
      timestamp({
        format: 'HH:mm:SS.SSS', // format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.ms(),
      format.printf((info) => {
        const { level, message, timestamp, ms } = info
        // console.log('info: ', info)
        // if (info.message.constructor === Object) {
        //   info.message = util.inspect(message, {
        //     depth: 6,
        //     compact: true,
        //     colors: true,
        //   })
        // }
        return `[${chalk.blackBright(timestamp)}] [${level}]:${message} [${ms}]`
      }),
      // format.prettyPrint({ depth: 1, colorize: true }),
    ),
  },
}

// eslint-disable-next-line new-cap
const logger = new createLogger({
  transports: [
    new transports.File(options.file),
    new transports.File(options.errorFile),
    new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    // logger.info(message)
    logger.info(message.substring(0, message.lastIndexOf('\n')))
  },
}

if (process.env.NODE_ENV !== 'production') {
  logger.error('error')
  logger.warn('warn')
  logger.info('info')
  logger.http('http')
  logger.verbose('verbose')
  logger.debug('debug')
  logger.silly('silly')
  logger.verbose({
    private: false,
    // level: 'error',
    message: 'This is super secret - hidasde it.',
  })
  logger.log({
    private: true,
    level: 'error',
    message: 'This is super secret - hidasde iast.',
  })
}

module.exports = logger
