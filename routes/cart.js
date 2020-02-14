const express = require('express')
const router = express.Router()
const { Product, Order } = require('./../models')
const cartCookiesValidation = require('./../helpers/cartCookiesValidation')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)

router.get('/', (req, res) => {
  const cartCookies = req.cookies.cart
  logger.verbose('cartCookies %O', cartCookies)
  console.log(req.session)

  const arrCartCookies = cartCookiesValidation(req.cookies.cart).sort()

  if (arrCartCookies.length === 0) {
    return res.render('cart/cart', {
      session: req.session,
    })
  }
  logger.verbose('arrCartCookies %O', arrCartCookies)
  logger.verbose('arrCartCookies.length %O', arrCartCookies.length)
  Product.findAll({
    where: {
      id: arrCartCookies,
    },
  })
    .then(products => {
      const rowProducts = products.map(e => e.get({ row: true }))
      let sumTotal = 0
      const productsWithAmount = rowProducts.map((product) => {
        product.amount = 0
        product.rowTotal = 0
        arrCartCookies.forEach(i => {
          if (i === product.id) {
            product.amount++
          }
        })
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

router.get('/add', (req, res, next) => {
  req.session.user.cart = [{
    productId: 1,
    amount: 2,
  }]
  res.json(req.session)
  console.log(req.session.user)
})

module.exports = router
