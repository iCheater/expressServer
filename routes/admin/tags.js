const express = require('express')
const router = express.Router()
const { Tag } = require('../../models')

router.get('/', (req, res) => {
  Tag.findAll({ limit: 200, where: {} })
    .then(tagsArr => {
      // res.json(tagsArr)

      // params.tags = tagsArr.map(tagInstance => {
      //   tagInstance.get({ row: true })
      // })
      // res.json(params.tags)
      res.render('admin/tags/tags', { tags: tagsArr })
    }).catch(err => {
      res.json(err)
    })
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
