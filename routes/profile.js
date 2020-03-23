const express = require('express')
const router = express.Router()
const { User } = require('./../models')
const sessionChecker = require('./../middleware/sessionChecker')

router.use(sessionChecker)

router.get('/', (req, res) => {
  User.findByPk(req.session.user.id).then((user) => {
    res.render('profile/profile', {
      user: user,
    })
  })
})

router.get('/edit/', (req, res) => {
  User.findAll()
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('profile/edit', {
        editOrAdd: 'Edit',
        user: rawData,
      })
    })
})

router.get('/favorites/', (req, res) => {
  User.findAll()
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('profile/favorites', {
        editOrAdd: 'Favorites',
        user: rawData,
      })
    })
})

router.get('/history/', (req, res) => {
  User.findAll()
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('profile/history', {
        editOrAdd: 'History',
        user: rawData,
      })
    })
})

router.get('/reviews/', (req, res) => {
  User.findAll()
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('profile/reviews', {
        editOrAdd: 'Reviews',
        user: rawData,
      })
    })
})

router.get('/addresses/', (req, res) => {
  User.findAll()
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('profile/addresses', {
        editOrAdd: 'Addresses',
        user: rawData,
      })
    })
})

module.exports = router
