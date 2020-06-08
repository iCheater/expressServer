const router = require('express').Router()
const appRoot = require('app-root-path')
// const passport = require(`${appRoot}/middleware/passport/passport`)
const passport = require('../../middleware/passport/passport')

router.get('/login', (req, res) => {
  res.render('auth/loginV2', { link: 'login' })
})

router.post('/localauth', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}))

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

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    console.error(err)
    res.redirect('/')
  })
})

module.exports = router
