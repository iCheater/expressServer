var express = require('express');
var router = express.Router();
var db = require('./../models');
var User = db.User;

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.findAll({raw: true})
        .then(function (users) {
            console.table(users)
            res.render('catalog', {users: users});
            // res.json(users);
        });
});

router.get('/add/:name', function (req, res) {
    console.log('name:', req.params.name);

    var userParams = {
        username: req.params.name,
        email: 'test@mai.ru'
    };
    User.create(userParams)
        .then(function (user) {
            res.json(user);
        });
});

module.exports = router;
