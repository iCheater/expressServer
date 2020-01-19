var express = require('express');
var router = express.Router();
var db = require('./../models');
var user = db.User;
var task = db.Task;

router.get('/', function(req, res) {
    // User.findAll({
    //     include: [ Task ]
    // }).then(function(users) {
    //     res.render('task', {
    //         title: 'Sequelize: Express Example',
    //         users: users
    //     });
    // });
    task.findAll({ limit: 15 }).then(function(tasks) {
        let rawData = tasks.map(e => e.get({row:true}));
        console.table(rawData);
        res.render('task', {
            title: 'Sequelize: Express Example',
            tasks: tasks
        });
    });
});


// router.post('/add', function (req, res) {
//     console.log('Got body:', req.body);
//     // console.log('Got body:', req);
//
//     var params = {
//         name: req.body.name,
//     };
//     // task.create(params)
//     //     .then(function (good) {
//     //         // res.json(good);
//     //         var msg = {
//     //             message: 'form data loaded',
//     //             status: 'ok',
//     //             data: good
//     //         };
//     //
//     //         res.json(msg);
//     //     });
//     res.redirect('/');
// });



module.exports = router;