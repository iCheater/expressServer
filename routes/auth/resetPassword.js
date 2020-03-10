const express = require('express')
const router = express.Router()
const { User, Token } = require('../../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)
const mailer = require(`${appRoot}/helpers/mailer`)
const { resetPasswordPage } = require(`${appRoot}/controllers/resetpassword`)

router.get('/', resetPasswordPage)
router.get('/forgot', (req, res, next) => {
  res.send('<form method="POST" action="/resetpassword/forgot"><label>введетная почта при регистрации</label><input type="text" name="email">  <input type="submit" value="Submit"> </form>') // todo нужна форма!
})
router.post('/forgot', (req, res, next) => {
  User.findOne({
    where: { email: req.body.mail },
    // include: {
    //   model: Token,
    //   as: 'tokens',
    // },
  })
    .then(user => {
      if (!user) {
        return res.send('<span>Пользователя с таким email не существует </span>')
      }
    })
  return res.json({ error: 'not implemented' }) // todo dublication of code, we need to split rout and controllers
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
      res.send(`<form method="POST" action="/resetpassword/"><label>введите новый пароль</label><input type="hidden" name="token" value="${req.params.token}"> <input type="text" name="password">  <input type="submit" value="Submit"> </form>`) // todo нужна форма!
    })
    .catch(err => {
      res.json(err)
    })
})
router.post('/', (req, res, next) => {
  console.log(req.body)
  Token.findOne({
    where: { token: req.body.token },
    include: {
      model: User,
    },
  })
    .then(token => {
      if (!token) {
        return res.json({ err: 'токен не найден!' }) // todo 404 !
      }

      if (token.expirationDate === null || Date.parse(token.expirationDate) < Date.now()) {
        return res.json({ err: 'ссылка просрочена' }) // todo 404 !
      }
      token.User.update({ password: req.body.password })

      return res.json({ token: token }) // todo 404 !
    }).catch(err => {
      res.json(err)
    })
})

module.exports = router
