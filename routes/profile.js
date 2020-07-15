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

router.get('/addresses/', async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        include: {
          model: Address,
          as: 'addresses',
        }
    })
      // const us
    const rowAddresses = user.addresses.map(address => address.get({ row: true }))
    // console.log(user)
    console.log('addresses', rowAddresses)

    res.render('profile/addresses', {
      user: user,
      addresses: rowAddresses,
    })

  } catch (err) {
    next(err)
  }
})

router.get('/orderItem/', (req, res) => {
  res.render('profile/orderItem')
})

router.get('/purchases/', (req, res) => {
  res.render('profile/purchases')
})

module.exports = router
