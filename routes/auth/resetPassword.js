const express = require('express')
const router = express.Router()
const { User,Mail,  Token } = require('../../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)
const mailer = require(`${appRoot}/helpers/mailer`)
const { resetPasswordPage } = require(`${appRoot}/controllers/resetpassword`)

router.get('/', resetPasswordPage)

router.get('/forgot', (req, res, next) => {
  res.send('<form method="POST" action="/resetpassword/forgot"><label>введетная почта при регистрации</label><input type="text" name="email">  <input type="submit" value="Submit"> </form>') // todo нужна форма!
})

router.post('/forgot', async (req, res, next) => {
  console.log('requestResetPassword', req.body)
  // if (!req.session.states) {
  //   req.session.states = {}
  // }

  // User.findOne({
  //   where: { email: req.body.email },
  //   // include: {
  //   //   model: Token,
  //   //   as: 'tokens',
  //   // },
  // })
  //   .then(user => {
  //     if (!user) {
  //       return res.send('<span>Пользователя с таким email не существует </span>')
  //     }
  //   })
  // return res.json({ error: 'not implemented' })
  // todo dublication of code, we need to split rout and controllers

  // req.session.states.resetForm = {
  //   email: req.body.email,
  //   status: req.body.status,
  // }

  let user
  try {
    user = await User.findOne({
      where: { email: req.body.email },
      include: {
        model: Token,
        as: 'tokens',
      },
    })

    if (!user) {
      return res.json({status: 'fail', msg: 'User with this mail is not registered'})
    }

    if (user) {
      // req.session.states.resetForm.msg = 'User with this mail registered'
      // if (req.session.states.resetForm.status === 'reset') {
      if (req.body.status === 'reset') {
        console.log('reset')
        //тут отправляем письмо со ссылкой на почту

        const tokenObj = await Token.create({
          type: 'resetPassword',
          user_id: user.id,
        })
        const tokenRow = tokenObj.get({ row: true })
        console.log('tokenRow',tokenRow)

        const mail = await Mail.create({
          type: 'PASSWORD_RESET',
          user_id: user.id,
          token: tokenRow.token,
        })


        // // no await, because we want to create order, even if mail server is down
        mailer.sendResetPassword({
          user: user,
          mailId: mail.id,
          token: token,
        })
        return res.json({status: 'success', msg: 'User with this mail registered'})
      }
    }
  } catch (err) {
    next(err)
  }

})

router.post('/newpassword', async (req, res, next) => {
  console.log('newpassw', req.body)
  try {

  } catch (err) {
    next(err)
  }
})

// router.get('/reset', (req, res, next) => {
//   // if (!req.isAuthenticated()) {
//   //   res.redirect('/login')
//   // }
//
//   console.log(req.session.user)
//   User.findByPk(req.session.user.id, {
//     include: {
//       model: Token,
//       as: 'tokens',
//     },
//   })
//     .then(user => {
//       if (!user) {
//         return res.json({ error: 'user not exist' }) // todo or 404 page not found? or error?
//       }
//
//       logger.verbose(`resend: [${!!req.query.force}]`)
//       if (req.query.force) {
//         const tokensForRemove = []
//         for (let i = 0; i < user.tokens.length; i++) {
//           if (user.tokens[i].type === 'resetPassword') { //  && user.tokens[i].deletedAt !== null
//             tokensForRemove.push(user.tokens[i].id)
//           }
//         }
//         Token.destroy({
//           where: { id: tokensForRemove },
//         }).catch(err => {
//           return res.json({ error: err })
//         })
//       } else {
//         if (user.tokens.find(token => token.type === 'resetPassword' && Date.parse(token.expirationDate) > Date.now())) {
//           return res.send('<span>Вам уже отправили письмо для восстановления пароля. </span><a href="/resetpassword/reset?force=true">Отправить повторно!</a>')
//         }
//       }
//
//       Token.create({
//         type: 'resetPassword',
//       }).then(token => {
//         user.addTokens([token.id])
//           .then(updatedUser => {
//             // updatedUser.tokens.push(token) // any ways to make it better?
//             res.json(updatedUser)
//             mailer.sendResetPassword({
//               email: updatedUser.email,
//               username: updatedUser.username,
//               token: token.token,
//             })
//             // res.send(`<span>На почту ${updatedUser.email} было отправлено письмо c ссылкой для сброса пароля</span>`)
//           })
//       })
//     }).catch(err => {
//       return res.json({ error: err })
//     })
// })

// http://localhost:5000/resetpassword/approve/:token
router.get('/approve/:token', (req, res, next) => {
  Token.findOne({
    where: { token: req.params.token },
    include: {
      model: User,
    },
  })
    .then(token => {
      console.log('token', token)
      if (!token) {
        return res.send('<span>такой ссылки не существует!</span>') // todo 404 !
      }

      if (token.expirationDate === null || Date.parse(token.expirationDate) < Date.now()) {
        return res.send('<span>ссылка просрочена!</span>')
      }
      res.render('auth/resetpassword')
      // todo нужна форма!
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
