'use strict'
// Требования Яндекса к честным рассылкам
// https://yandex.ru/support/mail/web/letter/create/send-many-letters.html
// https://passport.yandex.ru/profile
// refresh token
// https://yandex.ru/dev/oauth/doc/dg/reference/refresh-client-docpage/
const nodemailer = require('nodemailer')
const env = process.env.NODE_ENV || 'development'
const path = require('path')
// todo fix it
// eslint-disable-next-line no-path-concat
const config = require('../config/mailerconfig')[env]

// async..await is not allowed in global scope, must use a wrapper
async function main () {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount()
  //
  // // create reusable transporter object using the default SMTP transport
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // })
  const transporter = nodemailer.createTransport(config)

  const message = {
    from: config.auth.user,
    to: 'qaasdasd',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>',
  }
  // send mail with defined transport object
  const info = await transporter.sendMail(message)
  transporter.verify((error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Server is ready to take our messages')
    }
  })

  transporter.on('token', token => {
    console.log('A new access token was generated')
    console.log('User: %s', token.user)
    console.log('Access Token: %s', token.accessToken)
    console.log('Expires: %s', new Date(token.expires))
  })

  console.log('Message sent: %s', info.messageId) // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error)

const mailer = nodemailer.createTransport(config)

function sendMailConfirmation (user) {
  // todo https://www.npmjs.com/package/email-templates
  const message = {
    from: config.auth.user,
    to: config.auth.testRecipient,
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>',
  }
  mailer.sendMail(message)
}
function sendOrder (user, order) {}
function sendOrderStatus (user, order) {}
function sendResetPassword (user, order) {}
module.exports = mailer

// mailer.sendMailConfirmation(user)
