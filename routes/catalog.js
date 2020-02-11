const express = require('express')
const router = express.Router()
const { Product, Category, Sequelize: { Op } } = require('./../models')

router.get('/', (req, res, next) => {
  const promises = [
    Category.findAll(),
    Product.findAll({
      limit: 5,
      // raw: true,
    }),
  ]
  return Promise.all(promises).then(([categories, products]) => {
    console.log(products[0].features)
    res.render('catalog/catalog', {
      categories: categories,
      products: products,
    })
  }).catch(err => {
    res.json(err)
  })
})

router.get('/items/:idItem', (req, res, next) => {
  Product.findByPk(parseInt(req.params.idItem), {
    include: [{ model: Category }],
  })
    .then(product => {
      // console.log(product.Categories[0].name)
      console.log(product)
      res.render('catalog/catalogItem', {
        product: product,
        products: product,
        category: product.Categories[0].name,
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
