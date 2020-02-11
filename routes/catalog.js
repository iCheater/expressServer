const express = require('express')
const router = express.Router()
const { Product, Tag, Category, Sequelize: { Op } } = require('./../models')

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

router.get('/item/:idItem', (req, res, next) => {
  console.log(req.params.idItem)
  Product.findByPk(parseInt(req.params.idItem), {
    include: [
      { model: Category },
      { model: Tag },
    ],
  })
    .then(product => {
      // res.json(product.Tags[0].name)
      Product.findAll({
        limit: 10,
        include: [{
          model: Category,
          where: {
            id: 11,
          },
        }],
      }).then(products => {
        // res.json(products)
        res.render('catalog/catalogItem', {
          product: product,
          // tags: product.Tags,
          products: products,
          category: product.Categories[0].name,
        })
      })
    })
    .catch(err => {
      res.json(err)
    })
})

// http://localhost:5002/catalog/items?color=black&price=33&width=44
// https://sequelize.org/master/manual/model-querying-basics.html
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
      [Op.gte]: parseInt(req.query.width),
    }
  }

  if (req.query.price) {
    // Nested object example
    // where.features = {}
    // where.features.dimensions = {
    //   width: {
    //     [Op.gt]: parseInt(req.query.width) || 0,
    //   },
    // }
    // nested key example
    where.price = {
      [Op.gte]: parseInt(req.query.price),
    }
  }
  if (req.query.name) {
    where.name = {
      [Op.startsWith]: req.query.name,
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

router.get('/:categoryID', (req, res, next) => {
  Category.findByPk(parseInt(req.params.categoryID))
    .then(category => {
      if (category.length === 0) {
        return res.json({ category: 'not found' })
      }
      Product.findAll({
        include: [{
          model: Category,
          where: { id: parseInt(req.params.categoryID) },
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
