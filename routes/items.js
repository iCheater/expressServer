var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('item:', req.params.id);
    var params = {
        name: 'все товары',
    };
    res.render('items', params);
});

router.get('/:id', function(req, res, next) {
    console.log('item:', req.params.id);
    var params = {
        id: req.params.id ,
        price: 999,
        name: 'kukuha',
    };
    res.render('items', params);
});

module.exports = router;
