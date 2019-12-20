var express = require('express');
var router = express.Router();
var good = require('./../models').Good;
// var User = db.User;

/* GET goods page. */
router.get('/', function(req, res, next) {
    var params = {
        title: 'Express' ,
        auth: true,
    };
    console.log('asss');
    // res.render('goods', { title: 'Express' });
    res.send('это гет запрос');
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