var express = require('express');
var router = express.Router();
var db = require('./../models');
var User = db.User;
var Task = db.Task;

router.get('/', function(req, res) {
    User.findAll({
        include: [ Task ]
    }).then(function(users) {
        res.render('index', {
            title: 'Sequelize: Express Example',
            users: users
        });
    });
});

