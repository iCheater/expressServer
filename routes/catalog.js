const express = require('express')
const router = express.Router()
const Good = require('./../models')
/* GET catalog page. */
router.get('/', (req, res, next) => {
  Good.findAll({ raw: true })
    .then((goods) => {
      console.table(goods)
      res.render('catalog', { goods: goods })
    })
})

module.exports = router
