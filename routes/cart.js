const express = require('express')
const router = express.Router()
const { Product } = require('./../models')

router.get('/', (req, res) => {
  const cartCookies = req.cookies.cart
  console.log('cartCookies', cartCookies)

  let arrCartCookies = []

  if (cartCookies !== undefined) {
    arrCartCookies = cartCookies.split('|')
  }

  console.log('start', arrCartCookies)

  for (let i = 0; i < arrCartCookies.length; i++) {
    if (arrCartCookies[i] === '' || !Number.isInteger(parseInt(arrCartCookies[i]))) {
      arrCartCookies.splice(i, 1)
    }
    arrCartCookies[i] = Number(arrCartCookies[i])
  }
  console.log('finish', arrCartCookies)

  if (arrCartCookies.length === 0) {
    return res.render('cart/cart')
  }
  console.log('we are here', arrCartCookies)
  console.log('we are here', arrCartCookies.length)
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
