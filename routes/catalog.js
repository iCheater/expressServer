const express = require('express')
const router = express.Router()
const { Product, Category } = require('./../models')

router.get('/', (req, res, next) => {
  const promises = [
    Category.findAll(),
    Product.findAll({
      limit: 5,
      // raw: true,
    }),
  ]
  return Promise.all(promises).then(([categories, products]) => {
    res.render('catalog/catalog', {
      categories: categories,
      products: products,
    })
  }).catch(err => {
    res.json(err)
  })
})

router.get('/:category', (req, res, next) => {
  Category.findByPk(parseInt(req.params.category))
    .then(category => {
      if (category.length === 0) {
        return res.json({ category: 'not found' })
      }
      Product.findAll({
        include: [{
          model: Category,
          where: { id: parseInt(req.params.category) },
        },
        ],
      })
        .then(products => {
          // res.json(products)
          res.render('catalog/category', {
            products: products,
            category: category,
          })
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
