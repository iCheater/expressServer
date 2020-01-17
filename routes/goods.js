var express = require('express');
var router = express.Router();
var good = require('./../models').Good;

// var User = db.User;
var sessionChecker = require('./../middleware/sessionChecker');

router.use(sessionChecker);

router.get('/', function(req, res, next) {
    var params = {
        title: 'Express' ,
        auth: true,
        goods: null
    };
    // console.log('asss');
    // res.render('goods', { title: 'Express' });
    console.log(good);
    good.findAll({ limit: 10 })
        .then(data => {
            let rawData = data.map(e => e.get({row:true}));
            // console.table(rawData);
            // console.log(rawData);
            params.goods = rawData;
            res.render('goods', params);
            }
        )
});

router.get('/add/', function(req, res, next) {
    var params = {
        title: 'Express' ,
        auth: true,
    };
    console.log('add good');
    res.render('add_good');
    // res.send('это гет запрос add good');
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