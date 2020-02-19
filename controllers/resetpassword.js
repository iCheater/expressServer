const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)
const mailer = require(`${appRoot}/helpers/mailer`)
const { User, Token } = require(`${appRoot}/models`)


exports.resetPasswordPage = (req, res) => {
  res.send('<a href="/resetpassword/reset">reset password</a>')

  // res.send('NOT IMPLEMENTED: Author list')
}
