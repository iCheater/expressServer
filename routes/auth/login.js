const express = require('express')
const router = express.Router()
const { User } = require('../../models')

// /* GET loader page. */
router.get('/', function (req, res, next) {
  var params = {
    title: 'Express',
    auth: true
  }
  res.render('auth/login', { title: 'Express' })
})

router.post('/', function (req, res, next) {
  // res.render('login', { title: 'Express' });
  var username = req.body.username
  var password = req.body.password
  console.log(username, password)
  User.findOne({ where: { username: username } }).then(function (user) {
    // console.log(user);
    if (!user) {
      console.log('!user', user)
      res.redirect('/login')
    } else if (!user.validPassword(password)) {
      console.log('!validPassword')
      res.redirect('/login')
    } else {
      console.log('login ok. user')
      req.session.user = user.dataValues
      // req.session.user = {'test':"test"};
      // console.log('user.dataValues',user.dataValues);
      res.redirect('/')
    }
  })
})

module.exports = router
