const express = require('express')
const router = express.Router()
const { User } = require('./../models')
const sessionChecker = require('./../middleware/sessionChecker')

router.use(sessionChecker)

router.get('/', (req, res) => {
  User.findByPk(req.session.user.id).then((user) => {
    res.json(user)
    // res.render('profile', {
    //     user: user
    // });
  })
})

module.exports = router
