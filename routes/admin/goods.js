const express = require('express')
const router = express.Router()
const { Good, Category } = require('../../models')

router.get('/', (req, res, next) => {
  Good.findAll({ limit: 15 })
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      // console.table(rawData);
      // console.log(rawData);
      // console.log(jane.toJSON()); // This is good!
      // console.log(JSON.stringify(jane, null, 4)); // This is also good!
      res.render('admin/goods', { goods: rawData })
    })
})

router.get('/:id', (req, res, next) => {
  console.log(req.params)
  console.log(req.params.id)
  Good.findByPk(req.params.id)
    .then(data => {
      const rawData = data.map(e => e.get({ row: true }))
      // console.table(rawData);
      // console.log(rawData);
      // console.log(jane.toJSON()); // This is good!
      // console.log(JSON.stringify(jane, null, 4)); // This is also good!
      res.render('admin/goods', { goods: rawData })
    }).catch(error => {
      res.json(error)
    })
})
// https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm
// router.get('/add/', (req, res, next) => {
//   const params = {
//     categories: null
//   }
//
//   Category.findAll().then(data => {
//     params.categories = data.map(e => e.get({ row: true }))
//     console.table(params.categories)
//     res.render('add_good', params)
//   })
// })

router.post('/add', (req, res) => {
  const params = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    mURL: req.body.mURL,
    // category: req.body.category
    categories: [
      {
        id: 1,
        name: 'testcat1'
      },
      {
        id: 2,
        name: 'testcat2'
      }
    ]
  }
  const includeParams = {
    include: [{
      as: 'categories',
      association: Category
    }]
  }
  Good.create(params, includeParams)
    .then((good) => {
      // res.json(good);
      var msg = {
        message: 'form data loaded',
        status: 'ok',
        data: good
      }

      res.json(msg)
    })
})

module.exports = router
