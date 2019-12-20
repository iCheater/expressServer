var express = require('express');
var router = express.Router();
var good = require('./../models').Good;
/* GET catalog page. */
router.get('/', function(req, res, next) {

    good.findAll({raw: true})
        .then(function (goods) {
            console.table(goods);
            res.render('catalog', {goods: goods});
        });
});




module.exports = router;