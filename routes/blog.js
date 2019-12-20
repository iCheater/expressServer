var express = require('express');
var router = express.Router();
var blog = require('./../models').Blog;
// var User = db.User;

/* GET blog page. */
router.get('/', function(req, res, next) {

    console.log('asss');
    res.send('это гет запрос');
});

router.get('/add/', function(req, res, next) {
    console.log('add blog');
    res.render('add_blog');
});

router.post('/add', function (req, res) {
    console.log('Got body:', req.body);

    var params = {
        name: req.body.name,
        description: req.body.description,
        mURL: req.body.mURL
    };
    blog.create(params)
        .then(function (blog) {
            var msg = {
                message: 'form data loaded',
                status: 'ok',
                data: blog
            };

            res.json(msg);
        });

});



module.exports = router;