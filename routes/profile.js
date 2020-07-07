const express = require('express')
const router = express.Router()
const { User, Address } = require('./../models')
const isLoggedIn = require('../middleware/isLoggedIn')

router.use(isLoggedIn)

router.get('/', (req, res) => {
  console.log(req.session)
  User.findByPk(req.session.passport.user.id).then((user) => {
    res.render('profile/profile', {
      user: user,
    })
  })
})

router.get('/edit/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: {
        model: Address,
        as: 'addresses',
      }
    })
    const rowAddresses = user.addresses.map(address => address.get({ row: true }))
    // console.log(user)
    console.log('addresses', rowAddresses[0])

    res.render('profile/edit', {
      user: user,
      addresses: rowAddresses[0],
    })

  } catch (err) {
    next(err)
  }


  // console.log('edit', req.body)
  // User.findAll()
  //   .then(data => {
  //     const rawData = data.map(e => e.get({ row: true }))
  //     console.log(rawData)
  //     res.render('profile/edit', {
  //       // editOrAdd: 'Edit',
  //       // user: rawData,
  //     })
  //   })
})
// const addressController = require('../../controllers/addresses')
// router.put('/editUser/:id', addressController.update)

router.post('/editUser/', async (req, res, next) => {
  console.log('user', req.user.id)

  try {
    let user = await User.findOne({
      where: { id: req.user.id },
      include: {
        model: Address,
        as: 'addresses',
      },
    })
    console.log('user', user)

    if(!user) {
      console.log('dfg')
    }

    // user.username = req.body.name + req.body.surname
    // user.phone = req.body.phone
    // user.email = req.body.email
    // user.name = req.body.name
    // user.surname = req.body.surname
    // user.address = req.body.address
    // user.city = req.body.city
    // user.country = req.body.country
    // user.postcode = req.body.postcode
    // user.infoAbout = req.body.infoAbout

    await user.save()

    res.render('profile/edit', user)
    // res.json(userData)
  } catch (err) {
    next(err)
  }
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

router.get('/orderItem/', (req, res) => {
  res.render('profile/orderItem')
})

router.get('/purchases/', (req, res) => {
  res.render('profile/purchases')
})

module.exports = router
