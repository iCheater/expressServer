var express = require('express');
var router = express.Router();
var db = require('./../models');
var User = db.User;
var sessionChecker = require('./../middleware/sessionChecker');

router.get('/', function(req, res, next) {
    console.log('signup get');
    res.render('registration');
});

// router.post('/newuser', function (req, res) {
//     console.log('Got body:', req.body);
//
//     var params = {
//         login: req.body.login,
//         password: req.body.password,
//         email: req.body.email
//     };
//     User.create(params)
//         .then(function (User) {
//             var msg = {
//                 message: 'form data loaded',
//                 status: 'ok',
//                 data: User
//             };
//
//             res.json(msg);
//         });
//
// });

// guide https://www.codementor.io/@mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3

router.route('/')
    .get(sessionChecker, (req, res) => {
        res.render('registration');
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            })
            .catch(error => {
                res.redirect('/signup');
            });
    });


module.exports = router;