const express = require('express')
const router = express.Router()
const { User } = require('../../models')

// /* GET loader page. */
router.get('/', (req, res, next) => {
  // var params = {
  //   title: 'Express',
  //   auth: true
  // }
  res.render('auth/login', { title: 'Express' })
})

router.post('/', (req, res, next) => {
  // res.render('login', { title: 'Express' });
  const username = req.body.username
  const password = req.body.password
  console.log(username, password)
  User.findOne({ where: { username: username } }).then((user) => {
    console.log(user)
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
