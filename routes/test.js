var express = require('express');
var router = express.Router();
// var db = require('./../models');
// var Task = db.Task;
var { Task, User} = require('./../models');

router.get('/findAll', function (req, res, next) {
    Task.findAll({raw: true})
        .then(function (users) {
            console.table(users);
            // res.json('catalog', {users: users});
            res.json(users);
        });
});

router.get('/findByPk', function (req, res, next) {
    Task.findByPk(1,{
        raw: true,
        include: [{
            model: User,
            as: 'workers'
        }],
    })
        .then( (task) => {
            console.log(task.getworkers);
            console.log(task);
            console.table(task);
            res.json(task);
        });
});

router.get('/get', function (req, res, next) {
    Task.findAll({
        where: {
            id: 1
        },
        include: [{
            model: User,
            as: 'workers'
        }]
    })
        .then( (task) => {
            // task[0].getWorkers().then(console.log);
            console.log('(/home/cheater/projects/expressServer/node_modules/bluebird/js/release/async.js:86:9)')
            // console.log(task);
            res.json(task);
        });
});

router.get('/create', function (req, res) {
    console.log('name:', req.params.name);

    User.create({
        username: req.params.name,
        email: 'test@mai.ru'
    })
        .then( user => {
            res.json(user);
        })
});
module.exports = router;
