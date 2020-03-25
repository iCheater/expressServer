const router = require('express').Router()
const appRoot = require('app-root-path')
// const passport = require(`${appRoot}/middleware/passport/passport`)
const passport = require('../../middleware/passport/passport')

router.get('/login', (req, res) => {
  res.render('auth/multiLogin', { link: 'login' })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}))

router.get('/yandex', passport.authenticate('yandex'), (req, res) => {
  // The request will be redirected to Yandex for authentication, so
  // this function will not be called.
})
router.get('/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/')
  })
})
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  // res.redirect('/signin');
  res.fail({ message: 'not Authenticated' })
}

// router.get('/admin', isLoggedIn, (req, res) => {
//   res.render('admin/mainBlock')
// })

module.exports = router
