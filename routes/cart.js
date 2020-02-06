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

  const arrCartCookies = cartCookiesValidation(req.cookies.cart)

  if (arrCartCookies.length === 0) {
    return res.render('cart/cart')
  }
  // расчет повторов

  logger.info('arrCartCookies %O', cartCookies)
  logger.info('arrCartCookies.length %O', cartCookies.length)
  Product.findAll({
    where: {
      id: arrCartCookies,
    },
  })
    .then(products => {
      // res.json(products)
      res.render('cart/cart', {
        editOrAdd: 'cart',
        products: products,
      })
    })

})
module.exports = router
