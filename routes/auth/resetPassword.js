const express = require('express')
const router = express.Router()
const { User, Token } = require('../../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)
const mailer = require(`${appRoot}/helpers/mailer`)

router.get('/', (req, res, next) => {
  // todo password reset page
  res.send('<a href="/resetpassword/reset">reset password</a>')
})

router.get('/reset', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  console.log(req.session.user)
  User.findByPk(req.session.user.id, {
    include: {
      model: Token,
      as: 'tokens',
    },
  })
    .then(user => {
      if (!user) {
        return res.json({ error: 'user not exist' }) // todo or 404 page not found? or error?
      }

      logger.verbose(`resend: [${!!req.query.force}]`)
      if (req.query.force) {
        const tokensForRemove = []
        for (let i = 0; i < user.tokens.length; i++) {
          if (user.tokens[i].type === 'resetPassword') { //  && user.tokens[i].deletedAt !== null
            tokensForRemove.push(user.tokens[i].id)
          }
        }
        Token.destroy({
          where: { id: tokensForRemove },
        }).catch(err => {
          return res.json({ error: err })
        })
      } else {
        if (user.tokens.find(token => token.type === 'resetPassword' && Date.parse(token.expirationDate) > Date.now())) {
          return res.send('<span>Вам уже отправили письмо для восстановления пароля. </span><a href="/resetpassword/reset?force=true">Отправить повторно!</a>')
        }
      }

      Token.create({
        type: 'resetPassword',
      }).then(token => {
        user.addTokens([token.id])
          .then(updatedUser => {
            // updatedUser.tokens.push(token) // any ways to make it better?
            res.json(updatedUser)
            mailer.sendResetPassword({
              email: updatedUser.email,
              username: updatedUser.username,
              token: token.token,
            })
            // res.send(`<span>На почту ${updatedUser.email} было отправлено письмо c ссылкой для сброса пароля</span>`)
          })
      })
    }).catch(err => {
      return res.json({ error: err })
    })
})

// http://localhost:5000/resetpassword/approve/:token
router.get('/approve/:token', (req, res, next) => {
  Token.findOne({
    where: { token: req.params.token },
    include: {
      model: User,
    },
  })
    .then(token => {
      if (!token) {
        return res.send('<span>такой ссылки не существует!</span>') // todo 404 !
      }

      if (token.expirationDate === null || Date.parse(token.expirationDate) < Date.now()) {
        return res.send('<span>ссылка просрочена!</span>')
      }
      res.send('<span>вот форма смены пароля </span>') // todo нужна форма!
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router
