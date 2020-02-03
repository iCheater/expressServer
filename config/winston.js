const appRoot = require('app-root-path')
const util = require('util')
const { createLogger, format, transports, addColors } = require('winston')
const { combine, timestamp, label, printf } = format
// const colorizer = format.colorize()
// const dateFormat = require('date-format')
const path = require('path')
const chalk = require('chalk')

// todo https://www.npmjs.com/package/config

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info, opts) => {
  if (info.private) { return false }
  return info
})

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red',
    silly: 'red',
    http: 'red',
  },
}

const options = {
  file: {
    level: process.env.LOG_LEVEL || 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
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
    // json: false,
    // colorize: true,
    // prettyPrint: true, // todo google it
    format: combine(
      // format.padLevels(),

      ignorePrivate(),
      format.splat(),
      // format.simple(),
      format.colorize({ all: false, level: true, message: false }),
      label({ label: path.basename(process.mainModule.filename) }),
      timestamp({
        format: 'HH:mm:ss',
        // format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.ms(),
      format.printf((info) => {
        const { level, message, label, timestamp, ms } = info
        // console.log('info: ', info)
        // if (info.message.constructor === Object) {
        //   info.message = util.inspect(message, {
        //     depth: 6,
        //     compact: true,
        //     colors: true,
        //   })
        // }
        return `[${timestamp}] [${level}] [${label}] : ${info.message} ${ms}`
      }),

      // format.align(),

      // format.prettyPrint({ depth: 1, colorize: true }),
    ),
  },
}

addColors(myCustomLevels.colors) // todo
const logger = new createLogger({
  // levels: myCustomLevels.levels,
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
    logger.info(message)
  },
}

const obj = {
  int: 1,
  str: 'str',
  arr: [1, 'string'],
  obj: { test: 'test' },
}
logger.log('silly', "127.0.0.1 - there's no place like home")
logger.log('debug', "127.0.0.1 - there's no place like home")
logger.log('verbose', "127.0.0.1 - there's no place like home")
logger.info(obj)
logger.log('warn', "127.0.0.1 - there's no place like home")
logger.log('error', "127.0.0.1 - there's no place like home")
logger.log('http', "127.0.0.1 - there's no place like home")
logger.info("127.0.0.1 - there's no place like home")
logger.info('logger.info: %o', obj)
logger.info('test')
logger.info('Log me plz: %O', { ok: 'logged' })
logger.info('Log me plz: %O', obj)
logger.warn("127.0.0.1 - there's no place like home")
logger.error("127.0.0.1 - there's no place like home")
// Messages with { private: true } will not be written when logged.
logger.log({
  private: true,
  level: 'error',
  message: 'This is super secret - hide it.',
})

module.exports = logger
