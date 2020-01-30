const express = require('express')
const router = express.Router()
const { Product, Category } = require('./../models')

router.get('/', (req, res, next) => {
  const promises = [
    Category.findAll(),
    Product.findAll({
      // raw: true,
    }),
  ]
  return Promise.all(promises).then(([categories, products]) => {
    res.render('catalog', {
      categories: categories,
      products: products,
    })
  }).catch(err => {
    res.json(err)
  })
})
// promise chain example
// router.get('/', (req, res, next) => {
//   return Category.findAll().then(categories => {
//     return Product.findAll({
//       raw: true,
//     }).then(products => {
//       return {
//         categories: categories,
//         products: products,
//       }
//     })
//   }).then(data => {
//     res.render('catalog', data)
//   }).catch(err => {
//     res.json(err)
//   })
// })

module.exports = router
