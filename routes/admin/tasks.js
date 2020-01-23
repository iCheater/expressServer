const express = require('express')
const router = express.Router()
const { User, Task } = require('../../models')

router.get('/', function (req, res) {
  // User.findAll({
  //     include: [ Task ]
  // }).then(function(users) {
  //     res.render('task', {
  //         title: 'Sequelize: Express Example',
  //         users: users
  //     });
  // });
  Task.findAll({ limit: 15 }).then(function (tasks) {
    const rawData = tasks.map(e => e.get({ row: true }))
    console.table(rawData)
    res.render('admin/task', {
      title: 'Sequelize: Express Example',
      tasks: tasks
    })
  })
})

// router.post('/add', function (req, res) {
//     console.log('Got body:', req.body);
//     // console.log('Got body:', req);
//
//     var params = {
//         name: req.body.name,
//     };
//     // Task.create(params)
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

module.exports = router
