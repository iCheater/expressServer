var express = require('express');
var router = express.Router();
var good = require('./../models').Good;
var category = require('./../models').Сategory;

// var User = db.User;
var sessionChecker = require('./../middleware/sessionChecker');

router.use(sessionChecker);

router.get('/', function(req, res, next) {
    var params = {
        goods: null
    };

    console.log(good);
    good.findAll({ limit: 15 })
        .then(data => {
            let rawData = data.map(e => e.get({row:true}));
            // console.table(rawData);
            // console.log(rawData);
            // console.log(jane.toJSON()); // This is good!
            // console.log(JSON.stringify(jane, null, 4)); // This is also good!
            params.goods = rawData;
            res.render('goods', params);
            }
        )
});

router.get('/add/', function(req, res, next) {
    console.log('add good');
    var params = {
        categories: null,
    };

    category.findAll().then(data => {
        params.categories = data.map(e => e.get({row:true}));
        console.table(params.categories );
        res.render('add_good', params);
    })
});

router.post('/add', function (req, res) {
    console.log('Got body:', req.body);
    // console.log('Got body:', req);

    var params = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        mURL: req.body.mURL,
        category: req.body.category
    };
    good.create(params)
        .then(function (good) {
            // res.json(good);
            var msg = {
                message: 'form data loaded',
                status: 'ok',
                data: good
            };

            res.json(msg);
        });
    // res.send('POST request to the homepage');
});



module.exports = router;