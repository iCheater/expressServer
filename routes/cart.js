const express = require('express')
const router = express.Router()
const { Product } = require('./../models')

router.get('/', (req, res) => {
  // считать куки
  const arr = req.cookies.cart.split('|')
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '') {
      arr.splice(i, 1)
    }
    arr[i] = Number(arr[i])
  }
  Product.findAll({
    where: {
      id: arr,
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
