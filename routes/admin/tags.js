const express = require('express')
const router = express.Router()
const { Tag } = require('../../models')
const { Op } = require('../../models').Sequelize

router.get('/', (req, res) => {
  Tag.findAll({
    limit: 10,
    where: {
      name: {
        [Op.startsWith]: '%test',
      },
    },
    order: [
      // ['id', 'DESC'],
      // ['name', req.params.sort],
    ],
  })
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

router.post('/search', (req, res) => {
  console.log(req.body)
  // res.json({ msg: 'OK' })
  Tag.findAll({
    limit: 10,
    where: {
      name: {
        [Op.startsWith]: '%' + req.body.value + '%',
      },
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  }).then(tags => {
    res.json(tags)
  })
})

router.post('/', (req, res) => {
  Tag.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then(tag => {
      res.json(tag)
    }).catch((error) => {
      console.log(error)
    })
})

router.put('/:id', (req, res) => {
  Tag.update({
    name: req.body.name,
    description: req.body.description,
  }, {
    returning: true,
    where: { id: req.params.id },
  })
    .then(([rowsUpdate, [updatedTag]]) => {
      // res.redirect('/admin/products')
      res.redirect('/')
      console.table('rowsUpdate', rowsUpdate)
      console.table('updatedTag', updatedTag)
      // console.log(product)
      // product.setCategories(req.body.category)
      // res.json(product)
    }).catch((error) => {
      console.log(error)
    })
})

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then(rowDeleted => { // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        res.status(200).json({ links: { self: req.originalUrl } })
      }
      if (rowDeleted === 0) {
        res.status(404).json({ links: { self: req.originalUrl } })
      }
    })
    .catch(err => {
      console.log(err)
      // bad json api practice
      res.json(500, err)
    })
})

module.exports = router
