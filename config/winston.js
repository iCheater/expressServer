const appRoot = require('app-root-path')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const colorizer = format.colorize()
const dateFormat = require('date-format')

// todo i want logs look like this
//  [00:23:22] [info][nodemon] starting `node ./app.js`
// [date][level][[filename or process][msg]]

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
const myFormat = printf(({ level, message, label, timestamp, ms }) => {
  return `[${timestamp}] [${level}] [${label}] : ${message} ${ms}`
})

const options = {
  file: {
    level: process.env.LOG_LEVEL || 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
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
    colorize: true,
    // prettyPrint: true, // todo google it
    format: combine(
      // format.prettyPrint(),
      format.align(),
      ignorePrivate(),
      format.colorize(myCustomLevels.colors),
      label({ label: 'proccessNameLabel' }),
      timestamp({
        format: 'HH:mm:ss',
        // format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.ms(),
      // format.simple(),
      myFormat,
    ),
  },
}
// logger.addColors(myCustomLevels.colors) /
const logger = new createLogger({
  levels: myCustomLevels.levels,
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

logger.log('silly', "127.0.0.1 - there's no place like home")
logger.log('debug', "127.0.0.1 - there's no place like home")
logger.log('verbose', "127.0.0.1 - there's no place like home")
logger.log('info', '127.0.0.1 - tinfoinfoinfoinfoinfo home')
logger.log('warn', "127.0.0.1 - there's no place like home")
logger.log('error', "127.0.0.1 - there's no place like home")
logger.log('http', "127.0.0.1 - there's no place like home")
logger.info("127.0.0.1 - there's no place like home")
logger.warn("127.0.0.1 - there's no place like home")
logger.error("127.0.0.1 - there's no place like home")
// Messages with { private: true } will not be written when logged.
logger.log({
  private: true,
  level: 'error',
  message: 'This is super secret - hide it.',
})

module.exports = logger
