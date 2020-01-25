var express = require('express')
var router = express.Router()
var good = require('./../models').Good
/* GET catalog page. */
router.get('/', (req, res, next) => {
  good.findAll({ raw: true })
    .then((goods) => {
      console.table(goods)
      res.render('catalog', { goods: goods })
    })
})

module.exports = router
