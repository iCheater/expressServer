var express = require('express');
var router = express.Router();
var category = require('./../models').Category;

// var User = db.User;
var sessionChecker = require('./../middleware/sessionChecker');

router.use(sessionChecker);

router.get('/', function(req, res, next) {

    var params = { categories: null };

    category.findAll({ limit: 15 })
        .then(data => {
                let rawData = data.map(e => e.get({row:true}));
                // console.table(rawData);
                // console.log(rawData);
                // console.log(jane.toJSON()); // This is good!
                // console.log(JSON.stringify(jane, null, 4)); // This is also good!
                params.categories = rawData;
                res.render('categories', params);
            }
        )
});

router.post('/add', function (req, res) {
    console.log('Got body:', req.body);
    // console.log('Got body:', req);

    var params = {
        name: req.body.name,
        description: req.body.description,
    };
    category.create(params)
        .then(function (category) {
            // res.json(good);
            var msg = {
                message: 'form data loaded',
                status: 'ok',
                data: category
            };

            // res.json(msg);
            res.redirect('/admin/categories');
        });
});

module.exports = router;