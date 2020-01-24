const express = require('express')
const router = express.Router()
const { Product, Category } = require('../../models')

//
router.get('/', (req, res) => {
  Product.findAll({ limit: 15 })
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      // console.table(rawData);
      // console.log(rawData);
      // console.log(jane.toJSON()); // This is good!
      // console.log(JSON.stringify(jane, null, 4)); // This is also good!
      res.render('admin/products/products', { products: rawData })
    })
})

router.get('/add/', (req, res) => {
  Category.findAll().then(data => {
    const categories = data.map(e => e.get({ row: true }))
    res.render('admin/products/addProduct', { categories: categories })
  })
})

router.get('/:id', (req, res, next) => {
  console.log(req.params)
  console.log(req.params.id)
  Product.findByPk(req.params.id)
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      res.render('admin/goods', { goods: rawData })
    }).catch(error => {
    // res.status(404).send({ error: error })
    //   res.json(req)
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
      res.render('404', {
        message: error,
        url: fullUrl
      })
    })
  // res.status(404)
})

// create
router.post('/', (req, res) => {
  console.log(req.body)
  Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    mURL: req.body.mURL,
    // category: req.body.category
    Categories: [
      { name: 'qwer' },
      { name: 'asdfasdf' }
    ]
  }, {
    include: [{
      // as: 'products',
      // association: Product.categories,
      model: Category
    }]
  })
    .then((product) => {
      console.log(product)
      product.addCategory(1)
      res.json(product)
      // const data = product.map(e => e.get({ row: true }))
      // console.table(product.get())
      // res.json(product)
    }).catch((error) => {
      console.log(error)
    })
})
  // .findOrCreate({where: {username: 'sdepold'}

module.exports = router
