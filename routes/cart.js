const express = require('express')
const router = express.Router()
const { Product } = require('./../models')
const cartCookiesValidation = require('./../helpers/cartCookiesValidation')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)

router.get('/', (req, res) => {
  const cartCookies = req.cookies.cart
  logger.info('cartCookies %O', cartCookies)
  // console.log('cartCookies', cartCookies)

  const arrCartCookies = cartCookiesValidation(req.cookies.cart).sort()

  if (arrCartCookies.length === 0) {
    return res.render('cart/cart')
  }
  logger.info('arrCartCookies %O', arrCartCookies)
  logger.info('arrCartCookies.length %O', arrCartCookies.length)
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
        arrCartCookies.forEach(i => {
          if (i === product.id) {
            product.amount++
          }
        })
        sumTotal = sumTotal + product.price
        return product
      })
      // console.table(productsWithAmount)
      // res.json(products)
      // console.table(rowProducts)
      res.render('cart/cart', {
        editOrAdd: 'cart',
        products: productsWithAmount,
        sumTotal: sumTotal,
      })
    })
})
module.exports = router
