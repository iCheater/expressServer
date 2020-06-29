const router = require('express').Router()
const appRoot = require('app-root-path')
// const passport = require(`${appRoot}/middleware/passport/passport`)
const passport = require('../../middleware/passport/passport')

router.get('/login', (req, res) => {
  const obj = {}
  if(req.session.states && req.session.states.loginForm) {
    obj.avatar = req.session.states.loginForm.avatar
    obj.email = req.session.states.loginForm.email
  }
  res.render('auth/loginV2', obj)
})

// flash messages
// router.post('/localauth', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/auth/login',
// failureFlash: true,
// }))

router.post('/localauth', (req, res, next) => {
  console.log('1213', req.body)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json({ status: 'fail', message: info})
    }
    req.logIn(user,(err) => {
      if (err) {
        return next(err)
      }
      return res.json({ status: 'success', message: info})
    })
  })(req, res, next)
})

router.get('/yandex', passport.authenticate('yandex'))
router.get('/yandex/callback', passport.authenticate('yandex', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}))

router.get('/vkontakte', passport.authenticate('vkontakte'))
router.get('/vkontakte/callback', passport.authenticate('vkontakte', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}))

router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}))

router.get('/twitter', passport.authenticate('twitter'))
router.get('/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}))

router.get('/odnoklassniki', passport.authenticate('odnoklassniki'))
router.get('/odnoklassniki/callback', passport.authenticate('odnoklassniki', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}))

router.get('/google', passport.authenticate('google'))
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}))

router.get('/logout/', (req, res) => {
  console.log('logout')
  req.logout()
  res.redirect('/')
})

module.exports = router
