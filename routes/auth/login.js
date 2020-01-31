const express = require('express')
const router = express.Router()
const { User } = require('../../models')

// /* GET loader page. */
router.get('/', (req, res, next) => {
  res.render('auth/login', { title: 'Express' })
})

router.post('/', (req, res, next) => {
  // res.render('login', { title: 'Express' });
  const { username, password } = req.body
  console.log(username, password)
  User.findOne({ where: { username: username } }).then(async (user) => {
    console.log(user)
    if (!user) {
      console.log('!user', user)
      res.redirect('/login')
    } else if (!await user.validPassword(password)) {
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
