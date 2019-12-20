var express = require('express');
var router = express.Router();
var db = require('./../models');
var User = db.User;

/* GET blog page. */
router.get('/', function(req, res, next) {
    console.log('assuyuyguygs');
    res.render('registration');
});

router.post('/newuser', function (req, res) {
    console.log('Got body:', req.body);

    var params = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email
    };
    User.create(params)
        .then(function (User) {
            var msg = {
                message: 'form data loaded',
                status: 'ok',
                data: User
            };

            res.json(msg);
        });

});

module.exports = router;