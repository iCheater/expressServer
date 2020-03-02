const express = require('express')
const router = express.Router()
const { Product, User, Order } = require('./../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)

router.get('/', (req, res) => {
  console.log(req.session.user)
  if (!req.session.cart) {
    return res.render('cart/cart', {
      session: req.session,
    })
  }
  const arrCartID = Object.keys(req.session.cart)
  Product.findAll({
    where: {
      id: arrCartID,
    },
  })
    .then(products => {
      const rowProducts = products.map(product => product.get({ row: true }))
      let sumTotal = 0
      // const productsWithAmount = rowProducts.map((product) => {
      //   product.quantity = req.session.cart[product.id].quantity
      //   product.checked = req.session.cart[product.id].checked
      //   product.rowTotal = product.price * product.quantity
      //   sumTotal = sumTotal + product.rowTotal
      //   return product
      // })
      const productsOutOFStock = []
      const productsWithAmount = []
      rowProducts.forEach(product => {
        if (product.stock > 0) {
          product.quantity = req.session.cart[product.id].quantity
          product.checked = req.session.cart[product.id].checked
          product.rowTotal = product.price * product.quantity
          sumTotal = sumTotal + product.rowTotal
          productsWithAmount.push(product)
        } else {
          // todo add alternatives
          productsOutOFStock.push(product)
        }
      })
      res.render('cart/cart', {
        editOrAdd: 'cart',
        productsWithAmount: productsWithAmount,
        productsOutOFStock: productsOutOFStock,
        sumTotal: sumTotal,
        session: req.session,
      })
    })
})

router.post('/', (req, res) => {
  console.log(req.body)
  console.log(req.params)
  const formData = {
    userName: 'user',
    address: 'adress moscwa',
    promoCode: '',
    comment: 'привезите поскорее!!',
    shipping: 'курьером',
    email: 'asd@ad.ru',
    phone: '31234234',
    products: [55, 62],
    cart: {
      1: 10,
      2: 1,
      3: 2,
      4: 5,
    },
  }
  res.json({
    body: req.body.name,
    params: req.params,
  })

  // Order.create(formData, {
  //   include: [{ model: Product }],
  // })
  //   .then(cart => {
  //     console.log(cart)
  //     cart.setProducts([55, 62]).then(products => {
  //       res.json(products)
  //     })
  //   })

  // Order.findByPk(1, {
  //   include: {
  //     model: Product,
  //   },
  // }).then(orders => {
  //   res.json(orders)
  // })
})

router.put('/:productID', (req, res, next) => {
  // todo do we need to check if PRODUCT EXIST??
  console.log(req.params)
  console.log(req.body)
  const productID = req.params.productID
  console.log('productID', productID)

  if (!req.session.cart) {
    req.session.cart = {}
  }

  if (req.session.cart[productID]) {
    req.session.cart[productID].quantity++
  } else {
    req.session.cart[productID] = {}
    req.session.cart[productID].quantity = 1
    req.session.cart[productID].checked = true
  }
  const data = {
    cartLength: Object.keys(req.session.cart).length,
  }
  console.log('data', data)
  res.json(data)
  // console.log(req.session)
})

router.delete('/:productID', (req, res) => {
  console.log('req.session.cart', req.session.cart)
  delete req.session.cart[req.params.productID]
  console.log('req.session.cart', req.session.cart)
  res.status(200).json({ links: { self: req.originalUrl } })
})

router.post('/select', (req, res, next) => {
  console.log('req.body', req.body)
  console.log('req.session.cart before', req.session.cart)
  for (const key in req.body) {
    req.session.cart[key].checked = req.body[key]
  }
  console.log('req.session.cart after', req.session.cart)
  res.json({ mgs: req.session.cart })
})

router.post('/quantity', (req, res, next) => {
  console.log('req.body', req.body)
  console.log('req.session.cart before', req.session.cart)
  for (const key in req.body) {
    req.session.cart[key].quantity = req.body[key]
  }
  console.log('req.session.cart after', req.session.cart)
  res.json({ mgs: req.session.cart })
})

// router.post('/address', (req, res, next) => {
//   console.log('address ')
//   console.log('req.session', req.session)
//   console.log('req.session.user.addresses', req.session.user.addresses)
//   console.log('req.body address', req.body)
//   if (!req.session.order) { req.session.order = {} }
//   req.session.order.address = req.body.address
//   // megick return autocomplete
//   res.json({ address: req.session.order.address })
// })

router.post('/order', (req, res, next) => {
  console.log('order req.session', req.session)
  console.log('req.body address', req.body)

  if (!req.session.authorless) { req.session.authorless = {} }

  if (req.body.address) {
    req.session.authorless.address = req.body.address
    // megick return autocomplete
    res.json({ address: req.session.authorless.address })
  }
  if (req.body.name) {
    req.session.authorless.name = req.body.name
    res.json({ msg: 'ok' })
  }

  if (req.body.phone) {
    req.session.authorless.phone = req.body.phone
    res.json({ msg: 'ok' })
  }
  console.log('order req.session', req.session)
})

module.exports = router
