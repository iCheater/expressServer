const express = require('express')
const router = express.Router()
// var db = require('./../models');
// var Task = db.Task;
// eslint-disable-next-line no-unused-vars
const { Task, User, Project, Address, Tag } = require('./../models')

router.get('/findAll', (req, res, next) => {
  Task.findAll({ raw: true })
    .then((users) => {
      console.table(users)
      // res.json('catalog', {users: users});
      res.json(users)
    })
})

router.get('/findByPk', (req, res, next) => {
  Task.findByPk(1, {
    raw: true,
    include: [{
      model: User,
      as: 'workers'
    }]
  })
    .then((task) => {
      console.log(task.getworkers)
      console.log(task)
      console.table(task)
      res.json(task)
    })
})

// Task.hasMany(User, { as: 'workers'});
router.get('/get', (req, res, next) => {
  Task.findAll({
    where: {
      id: 1
    },
    include: [{
      model: User,
      as: 'workers'
    }]
  }).then((task) => {
    res.json(task)
  })
})

router.get('/create', (req, res) => {
  // console.log('Project.User:', Project.User);

  // User.Addresses = User.hasMany(Address, {as: 'addresses'});
  User.create({
    username: 'admin2',
    email: 'admin@admin.ru2',
    password: 'admin',
    addresses: [{
      type: '333asd',
      line1: '100 Main St.',
      line2: '112312312300 Main St.',
      city: 'jopa',
      state: 'TX',
      zip: '78704'
    }]
  }, {
    include: [{
      // include: [ User.Addresses ],
      association: User.Addresses
    }]
  })

  // User.hasMany(Tag, { as: 'tags'});
  // User.create({
  //     username: 'admin2',
  //     email: 'admin@admin.ru2',
  //     password: 'admin',
  //     tags: [
  //         { name: 'Alpha'},
  //         { name: 'Beta'}
  //     ]
  // }, {
  //     include: [{
  //         model: Tag,
  //         as: 'tags'
  //     }]
  // })

    // Project.User = Project.belongsTo(User, {as: 'user'});
    // User.Addresses = User.hasMany(Address, {as: 'addresses'});
    // Project.create({
    //     name: 'ChairProject',
    //     user: {
    //         username: 'admin2',
    //         email: 'admin@admin.ru2',
    //         password: 'admin',
    //         addresses: [{
    //             type: '33333333',
    //             line1: '100 Main St.',
    //             line2: '100 Main St.',
    //             city: 'Austin',
    //             state: 'TX',
    //             zip: '78704'
    //         }]
    //     }
    // }, {
    //     include: [{
    //         association: Project.User,
    //         include: [ User.Addresses ]
    //     }]
    // })
    .then(dataFromDb => {
      res.json(dataFromDb)
    })
})
module.exports = router
