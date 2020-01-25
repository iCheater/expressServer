const express = require('express')
const router = express.Router()
const { Category } = require('../../models')

router.get('/', (req, res) => {
  const params = { categories: null }

  Category.findAll({ limit: 15 })
    .then(data => {
      // console.table(rawData);
      // console.log(rawData);
      // console.log(jane.toJSON()); // This is good!
      // console.log(JSON.stringify(jane, null, 4)); // This is also good!
      params.categories = data.map(e => e.get({ row: true }))
      res.render('categories', params)
    }
    )
})

// router.post('/add', (req, res) => {
//   const params = {
//     name: req.body.name,
//     description: req.body.description
//   }
//   Category.create(params)
//     .then((category) => {
//       // res.json(good);
//       // const msg = {
//       //   message: 'form data loaded',
//       //   status: 'ok',
//       //   data: category
//       // }
//
//       // res.json(msg);
//       res.redirect('/admin/categories')
//     })
// })

module.exports = router
