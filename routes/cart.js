const express = require('express')
const router = express.Router()
const { Product, Order } = require('./../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)

router.get('/', (req, res) => {
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
      const productsWithAmount = rowProducts.map((product) => {
        product.amount = req.session.cart[product.id]
        product.rowTotal = product.price * product.amount
        sumTotal = sumTotal + product.rowTotal
        return product
      })
      res.render('cart/cart', {
        editOrAdd: 'cart',
        products: productsWithAmount,
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

  if (!req.session.cart) { req.session.cart = {} }

  if (req.session.cart[productID]) {
    req.session.cart[productID].amount++
  } else {
    req.session.cart[productID] = {}
    req.session.cart[productID].amount = 1
    req.session.cart[productID].checked = true
  }
  console.log('cart', req.session.cart)
  res.json(req.session)
  // console.log(req.session)
})

router.delete('/:productID', (req, res) => {
  console.log('req.session.cart', req.session.cart)
  delete req.session.cart[req.params.productID]
  console.log('req.session.cart', req.session.cart)
  res.status(200).json({ links: { self: req.originalUrl } })
})

router.post('/select', (req, res, next) => {
  console.log(req.body)
  console.log(req.session.cart)
  const keys = Object.keys(req.body)
  console.log('keys', keys)
  for (const key in req.body) {
    console.log(`key: ${key} value: ${req.body[key]}`)
    console.log(`value: ${req.session.cart[key].checked}`)
  }
  res.json(
    { mgs: req.body })
})

module.exports = router
