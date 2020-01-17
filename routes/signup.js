var express = require('express');
var router = express.Router();
var db = require('./../models');
var User = db.User;
var sessionChecker = require('./../middleware/sessionChecker');

router.get('/', function(req, res, next) {
    console.log('signup get');
    res.render('signup');
});

router.post('/', function (req, res) {
    console.log('Got body:', req.body);

    var params = {
        username: req.body.login,
        password: req.body.password,
        email: req.body.email
    };
    User.create(params)
        .then(function (user) {
            var msg = {
                message: 'form data loaded',
                status: 'ok',
                data: user
            };

            // res.json(msg);
            req.session.user = user.dataValues;
            console.log(msg);
            res.redirect('/');
        })
        .catch(error => {
            res.json(error);
                 // res.redirect('/err');
         });

});

// guide https://www.codementor.io/@mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3

// router.route('/')
//     .get(sessionChecker, (req, res) => {
//         res.render('signup');
//     })
//     .post((req, res) => {
//         console.log('signupsignupsignupsignup');
//         User.create({
//             login: req.body.login,
//             password: req.body.password,
//             email: req.body.email
//         })
//             .then(user => {
//                 req.session.user = user.dataValues;
//                 res.redirect('/dashboard');
//             })
//             .catch(error => {
//                 res.redirect('/signup');
//             });
//     });


module.exports = router;