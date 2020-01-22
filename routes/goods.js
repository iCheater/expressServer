const express = require('express');
const router = express.Router();
const { Good, Category } = require('./../models');
const sessionChecker = require('./../middleware/sessionChecker');

router.use(sessionChecker);

router.get('/', function (req, res, next) {
    Good.findAll({ limit: 15 })
        .then(data => {
                let rawData = data.map(e => e.get({ row: true }));
                // console.table(rawData);
                // console.log(rawData);
                // console.log(jane.toJSON()); // This is good!
                // console.log(JSON.stringify(jane, null, 4)); // This is also good!
                res.render('goods', { goods: rawData });
            }
        );
});

router.get('/add/', function (req, res, next) {

    let params = {
        categories: null
    };

    Category.findAll().then(data => {
        params.categories = data.map(e => e.get({ row: true }));
        console.table(params.categories);
        res.render('add_good', params);
    });
});

router.post('/add', function (req, res) {

    let params = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        mURL: req.body.mURL,
        // category: req.body.category
        categories: [
            { id: 1, name: 'testcat1' },
            { id: 2, name: 'testcat2' }
        ]
    };
    let includeParams = {
        include: [{
            as: 'categories',
            association: Category
        }]
    };
    Good.create(params, includeParams)
        .then(function (good) {
            // res.json(good);
            var msg = {
                message: 'form data loaded',
                status: 'ok',
                data: good
            };

            res.json(msg);
        });
});

module.exports = router;