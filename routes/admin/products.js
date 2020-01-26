const express = require('express')
const router = express.Router()
const { Product, Category } = require('../../models')

// get all page
router.get('/', (req, res) => {
  Product.findAll({ limit: 4 })
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      // const rawData = data.get({ row: true })
      console.log(rawData)

      res.render('admin/products/products', { products: rawData })
    })
})
// create page
router.get('/add/', (req, res) => {
  Category.findAll()
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      console.log(rawData)
      res.render('admin/products/addProduct', {
        editOrAdd: 'Add',
        categories: rawData,
        method: 'post'
      })
      // res.render('admin/products/products', { products: rawData })
    })
})
// edit page
router.get('/edit/:id', (req, res) => {
  // how to chain?
  Product.findByPk(req.params.id, {
    include: [{ model: Category }]
  }).then(product => {
    // res.json(product)
    // const tableProduct = product.map(e => e.get({ row: true }))
    console.table(product.get({ row: true }))
    res.render('admin/products/addProduct', {
      product: product,
      editOrAdd: 'Edit',
      method: 'patch'
    })
  })
})

router.patch('/:id', (req, res) => {

  console.log('///////////////')
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
      console.table(rowsUpdate)
      console.table(updatedProduct)
      // console.log(product)
      // product.setCategories(req.body.category)
      // res.json(product)
    }).catch((error) => {
    console.log(error)
  })
})

// get by id
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

// create (must redirect to product preview page
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

router.delete('/:id', (req, res) => {

  // Product.destroy({
  //   where: { id: req.params.id }
  // })
  //   .then(rowDeleted => { // rowDeleted will return number of rows deleted
  //     if (rowDeleted === 1) {
  //       res.redirect('/')
  //     }
  //   })
  //   .catch(err => {
  //   console.log(err)
  //
  // })
  res.json(200, {redirect: '/admin/products'})
  // res.method = 'GET'
  // res.redirect(303,'/admin/products')

  //
})
// .findOrCreate({where: {username: 'sdepold'}

// preview
router.get('/preview/:id', (req, res, next) => {
  res.render('admin/products/product', {})
})

module.exports = router
