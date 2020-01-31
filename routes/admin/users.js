const express = require('express')
const router = express.Router()
const { User } = require('../../models')

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.findAll({ raw: true })
    .then((users) => {
      console.table(users)
      // res.render('catalog', {users: users});
      res.json(users)
    })
})

router.get('/add/:name', (req, res) => {
  console.log('name:', req.params.name)

  var userParams = {
    username: req.params.name,
    email: 'test@mai.ru',
  }
  User.create(userParams)
    .then((user) => {
      res.json(user)
    })
})

module.exports = router
