const express = require('express')
const router = express.Router()
const { Product, Category } = require('../../models')

router.get('/', (req, res) => {
  Product.findAll({ limit: 4 })
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('admin/products/products', { products: rawData })
    })
})
router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id, {
    include: [{ model: Category }]
  })
    .then(data => {
      data.setCategories([2])
      res.json(data)
      // res.render('admin/products/product', { goods: rawData })
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
router.get('/add/', (req, res) => {
  Category.findAll()
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('admin/products/addProduct', {
        editOrAdd: 'Add',
        categories: rawData
      })
    })
})
router.get('/edit/:id', (req, res) => {
  // how to chain?
  console.log(req.params.id)
  Product.findByPk(req.params.id, {
    include: [{ model: Category }]
  }).then(product => {
    // res.json(product)
    // const tableProduct = product.map(e => e.get({ row: true }))
    console.table(product.get({ row: true }))
    res.render('admin/products/addProduct', {
      product: product,
      editOrAdd: 'Edit',
      id: req.params.id
    })
  })
})
router.get('/preview/:id', (req, res, next) => {
  res.render('admin/products/product')
})

router.post('/', (req, res) => {
  Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    mURL: req.body.mURL
  }, {
    include: [{ model: Category }]
  })
    .then(product => {
      // console.log(product)
      product.setCategories(req.body.category)
      res.json(product)
    }).catch((error) => {
      console.log(error)
    })
})
router.put('/:id', (req, res) => {
  Product.update({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    mURL: req.body.mURL,
    Category: req.body.category
  }, {
    returning: true,
    where: { id: req.params.id },
    include: [{ model: Category }]
  })
    .then(([rowsUpdate, [updatedProduct]]) => {
      // res.redirect('/admin/products')
      res.redirect('/')
      console.table('rowsUpdate', rowsUpdate)
      console.table('updatedProduct', updatedProduct)
      // console.log(product)
      // product.setCategories(req.body.category)
      // res.json(product)
    }).catch((error) => {
      console.log(error)
    })
})
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: { id: req.params.id }
  })
    .then(rowDeleted => { // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        res.json(200, { links: { self: req.originalUrl } })
      }
      if (rowDeleted === 0) {
        res.json(404, { links: { self: req.originalUrl } })
      }
    })
    .catch(err => {
      console.log(err)
      // bad json api practice
      res.json(500, err)
    })
})

module.exports = router
