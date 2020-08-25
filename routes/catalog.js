const express = require('express')
const router = express.Router()
const { Product, User, Tag, Favorite, Category, Sequelize: { Op } } = require('./../models')

router.get('/', (req, res, next) => {
  const promises = [
    Category.findOne({
      attributes: ['id', 'name', 'description', 'hierarchy_level'], // remove unnecessary fields
      where: { id: 1 }, // looking for root category
      include: {
        where: {
          hierarchy_level: {
            [Op.lte]: 3,
          },
        },
        attributes: ['id', 'name', 'description', 'parent_id', 'hierarchy_level'], // remove unnecessary fields
        model: Category,
        as: 'descendents',
        hierarchy: true,
      },
    }),
    Category.findAll({
      limit: 10,
      order: [['visitCounter', 'DESC']],
    }),
    Product.findAll({
      limit: 5,
      order: [['visitCounter', 'DESC']],
    }),
  ]
  return Promise.all(promises).then(([categoriesHierarchical, categoriesPopular, products]) => {
    // res.json(categoriesHierarchical)
    res.render('catalog/catalog', {
      categoriesHierarchical: categoriesHierarchical.children,
      categoriesPopular: categoriesPopular,
      products: products,
    })
  }).catch(err => {
    console.log(err)
    res.json(err)
  })
})

// тут творится кое-что ужасное, тот кто найдет и оптимизирует запрос до одного не получит люлей
router.get('/item/:idItem', (req, res, next) => {
  console.log(req.params.idItem)

  Product.findByPk(parseInt(req.params.idItem), {
    include: [
      { model: Category },
      { model: Tag },
    ],
  })
    .then(product => {
      product.update(
        { visitCounter: product.visitCounter + 1 },
      )
        .then(test => {
          console.log(test)
        })
      Product.findAll({
        limit: 7,
        where: {
          category_id: product.category_id,
        },
        include: [{
          model: Category,
          attributes: ['id', 'name'],
        }],
      }).then(products => {
        // res.json(products)
        // const test = JSON.parse(product.features)
        //
        // product.update(
        //   { visitCounter: products.visitCounter + 1 },
        // )

        res.render('catalog/catalogItem', {
          product: product,
          // tags: product.Tags,
          products: products,
          features: product.features,
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

router.get('/:categoryID', async (req, res, next) => {
  console.log('req.params.categoryID', req.params.categoryID)
  try {
    const category = await Category.findByPk(parseInt(req.params.categoryID))
    if (category.length === 0) {
      return res.json({ category: 'not found' })
    }
    category.update(
      { visitCounter: category.visitCounter + 1 },
    )

    const products = await Product.findAll({
      include: [{
        model: Category,
        where: { id: parseInt(req.params.categoryID) },
      }],
    })

    const favorites = await Favorite.findAll({
      where: { user_id: req.user.id },
    })
    // const arrFavorites = []
    // for(let i = 0; i < favorites.length; i++) {
    //   arrFavorites.push(favorites[i].dataValues.product_id)
    // }
    // console.log('arrFavorites', arrFavorites)

    const rowProducts = products.map(product => product.get({ row: true }))
    const productsWithData = rowProducts.map((product) => {

      if (req.session.cart && req.session.cart.items[product.id]) {
        product.quantity = req.session.cart.items[product.id].quantity
      }

      for (let favorite of favorites) {
          if (product.id === favorite.dataValues.product_id) {
            // console.log('coincidence')

            product.favorite = favorite.dataValues
            console.log('123',product.favorite)

          }
      }

      return product
    })
    res.render('catalog/category', {
      products: productsWithData,
      category: category,
    })

  } catch (err) {
    next(err)
  }

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
