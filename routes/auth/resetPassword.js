const express = require('express')
const router = express.Router()
const { User, Token } = require('../../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)

router.get('/', (req, res, next) => {
  // todo password reset page
  res.send('<a href="/resetpassword/reset">reset password</a>')
})

router.get('/reset', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  const user = await User.findByPk(req.session.user.id, {
    include: {
      model: Token,
      as: 'tokens',
    },
  })

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
    const result = await Token.destroy({
      where: { id: tokensForRemove },
    }).catch(err => {
      return res.json({ error: err })
    })
  } else {
    if (user.tokens.find(token => token.type === 'resetPassword' && Date.parse(token.expirationDate) > Date.now())) {
      return res.send('<span>Вам уже отправили письмо для восстановления пароля. </span><a href="/resetpassword/reset?force=true">Отправить повторно!</a>')
    }
  }

  const token = await Token.create({
    type: 'resetPassword',
  })

  user.addTokens([token.id])
    .then(updatedUser => {
      if (!updatedUser) {
        // todo
      }
      // mailer.sendResetPassword()
      res.send(`<span>На почту ${updatedUser.email} было отправлено письмо c ссылкой для сброса пароля</span>`)
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

      const promisesArr = [
        User.update(
          { verified: true },
          { where: { id: token.User.id } },
        ),
        token.update({
          expirationDate: null,
        }),
      ]

      return Promise.all(promisesArr)
    })
    .then(([user, token]) => {
      res.send('<span>Вы успешно подтвердили почту</span>')
    }).catch(err => {
      res.json(err)
    })
})

module.exports = router
