const express = require('express')
const router = express.Router()
const { User, Token } = require('../../models')

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

  if (user.tokens.find(token => token.type === 'resetPassword')) {
    return res.send('<span>Вам уже отправили письмо для восстановления пароля. </span><a href="/resetpassword/reset/resend">Отправить повтороно!</a>')
  }

  const token = await Token.create({
    type: 'resetPassword',
  })

  user.addTokens([token.id])
  // .then(updatedUser => {
  //   res.send(`<span>На почту ${updatedUser.email} был отправлено письмо c ссылкой для сброса пароля</span>`)
  // })
  res.json({
    token: token,
    user: user,
    // user2: user2,
  })
})

router.get('/approve/:token', (req, res, next) => {
  console.log(req.params)
  res.json({ 'req.params': req.params })
})

module.exports = router
