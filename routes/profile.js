const express = require('express')
const router = express.Router()
const { User } = require('./../models')
const sessionChecker = require('./../middleware/sessionChecker')

router.use(sessionChecker)

router.get('/', (req, res) => {
  User.findByPk(req.session.user.id).then((user) => {
    // res.json(user)
    res.render('profile/profile', {
      user: user
    })
  })
})

router.get('/edit/', (req, res) => {
  // User.findByPk(req.session.user.id).then((user) => {
  //   res.render('/edit/:id', {
  //     user: user
  //   });
  // })
  User.findAll()
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('profile/edit', {
        editOrAdd: 'Edit',
        user: rawData
      })
    })
})

module.exports = router
