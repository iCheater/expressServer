const express = require('express')
const router = express.Router()
const { User } = require('../../models')

// /* GET loader page. */
router.get('/', (req, res, next) => {
  res.render('auth/login', { title: 'Express' })
})

router.post('/', (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    console.log('!username', username)
    console.log('!password', password)
    return res.redirect(400, '/login')
  }
  console.log(`Correct auth: ${username} ${password}`)
  // console.log('User', User)
  User.findOne({ where: { username: username } }).then(async (user) => {
    // console.log('findOne return:', user)
    if (!user) {
      console.log('!user', user.dataValues)
      res.redirect(400, '/login')
    } else if (!await user.validPassword(password)) {
      console.log('!validPassword')
      res.redirect(400, '/login')
    } else {
      console.log('login ok. user')
      req.session.user = user.dataValues
      // req.session.user = {'test':"test"};
      // console.log('user.dataValues',user.dataValues);
      res.redirect(200, '/')
    }
  })
})

module.exports = router
