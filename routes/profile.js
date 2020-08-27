const express = require('express')
const router = express.Router()
const { User, Address, Order, OrderItem, Product, Favorite } = require('./../models')
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
      },
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

router.get('/favorites/', async (req, res, next) => {
  try {
    const favorites = await Favorite.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'mURL', 'sellingPrice'],
      }]
    })
    const arrFavorites = []
    for(let i = 0; i < favorites.length; i++) {
      arrFavorites.push(favorites[i].dataValues)
      console.log('123',favorites[i].dataValues)
    }
    res.render('profile/favorites', {
      favorites: favorites,
    })
    // res.json({'123': favorites})
  } catch (err) {
    next(err)
  }
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

// router.get('/reviews/', (req, res) => {
//   User.findAll()
//     .then(data => {
//       const rawData = data.map(e => e.get({ row: true }))
//       console.log(rawData)
//       res.render('profile/reviews', {
//         editOrAdd: 'Reviews',
//         user: rawData,
//       })
//     })
// })

router.get('/addresses/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: {
        model: Address,
        as: 'addresses',
      },
    })
    const rowAddresses = user.addresses.map(address => address.get({ row: true }))
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

router.get('/purchases/', async (req, res, next) => {
  // try {
  //   const orders = await Order.findAll({
  //     where: { user_id: req.user.id },
  //     include: {
  //       attributes: ['product_id'],
  //       model: OrderItem,
  //       as: 'items',
  //       include: {
  //         model: Product,
  //         attributes: ['id', 'name', 'mURL', 'sellingPrice'],
  //       },
  //
  //     },
  //   })
  //
  //   const items = []
  //
  //   orders.forEach(order => {
  //     order.items.forEach(item => {
  //       items.push(item.Product.dataValues)
  //     })
  //   })
  //
  //   console.log('items', items)
  //
  //   for (let i = 0; i < items.length; i++) {
  //     const productId = items[i].id
  //     for (let j = i + 1; j < items.length; j++) {
  //       if (productId === items[j].id) {
  //         items.splice(j, 1)
  //       }
  //     }
  //   }
  //   console.log('items for', items)
  //
  //   res.render('profile/purchases', {
  //     orders: orders,
  //     items: items,
  //   })
  //
  // } catch (err) {
  //   next(err)
  // }
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{
          model: Product,
          attributes: ['id', 'name', 'mURL', 'sellingPrice'],
        }]
      }],
    })

    const favorites = await Favorite.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'mURL', 'sellingPrice'],
      }]
    })

    const arrItems = []
    for(let order of orders) {
      for(let item of order.items) {
        arrItems.push(item.Product)
      }
    }

    const arrFavorites = []
    for(let i = 0; i < favorites.length; i++) {
      arrFavorites.push(favorites[i].dataValues.product_id)
    }
    console.log('favorites',arrFavorites)

    for(let i = 0; i < arrFavorites.length; i++) {
      for(let j = 0; j < arrItems.length; j++){
        if(arrFavorites[i] === arrItems[j].dataValues.id){
          arrItems[j].favorite = arrFavorites[i]
          console.log('considence', arrFavorites[i])
        }
      }
    }

    console.log('orderItems',arrItems[5])

    res.render('profile/purchases', {
      orderItems: arrItems,
      favorites: favorites,
    })
  } catch (err) {
    next(err)
  }

})

module.exports = router
