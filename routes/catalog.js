const express = require('express')
const router = express.Router()
const { Product, Category, Sequelize: { Op } } = require('./../models')

router.get('/', (req, res, next) => {
  const promises = [
    Category.findAll(),
    Product.findAll({
      // raw: true,
    }),
  ]
  return Promise.all(promises).then(([categories, products]) => {
    console.log(products[0].features)
    res.render('catalog', {
      categories: categories,
      products: products,
    })
  }).catch(err => {
    res.json(err)
  })
})

// http://localhost:5002/catalog/items?color=black&price=33&width=44
router.get('/items', (req, res) => {
  console.log(req.query.color)
  console.log(req.query.price)
  const where = {}

  if (req.query.color) {
    // Nested object example
    // where.features = {}
    // where.features.color = {
    //   [Op.eq]: req.query.color,
    // }
    // nested key example
    where['features.color'] = {
      [Op.eq]: req.query.color,
    }
  }

  if (req.query.width) {
    // Nested object example
    // where.features = {}
    // where.features.dimensions = {
    //   width: {
    //     [Op.gt]: parseInt(req.query.width) || 0,
    //   },
    // }
    // nested key example
    where['features.dimensions.width'] = {
      [Op.gt]: parseInt(req.query.width) || 0,
    }
  }

  const order = []
  if (req.query.order) {
    order.push(['features.dimensions.width', 'DESC'])
  }

  Product.findAll({
    where,
    order,
  })
    .then(products => {
      res.json(products)
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
