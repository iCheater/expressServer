const morgan = require('morgan') // logger
const chalk = require('chalk')
// todo different colors for get/post/path/delete
module.exports = function (args) {
  return morgan((tokens, req, res) => {
    return [
      // (`[${format('hh:mm:SS.SSS', new Date())}]`),
      chalk.bold.blue(tokens.method(req, res)),
      tokens.url(req, res),
      chalk.bold.yellow(tokens.status(req, res)),
      tokens.res(req, res, 'content-length'),
      chalk.magenta(tokens['response-time'](req, res) + 'ms'),
    ]
      .join(' ')
  }, args)
}
