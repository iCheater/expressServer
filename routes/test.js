const faker = require('faker')
const express = require('express')
const router = express.Router()
// var db = require('./../models');
// var Task = db.Task;
// eslint-disable-next-line no-unused-vars
const { Task, User, Category, Address, Product } = require('./../models')

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
      as: 'workers',
    }],
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
      id: 1,
    },
    include: [{
      model: User,
      as: 'workers',
    }],
  }).then((task) => {
    res.json(task)
  })
})

router.get('/gen', (req, res) => {
  Product.create({
    name: faker.commerce.product(),
    price: faker.commerce.price(0, 9999, 2),
    mURL: faker.image.abstract(),
    description: faker.commerce.productName(),
  }, { include: [{ model: Category }] })
    .then(data => { data.setCategories([1, 2]) })
    .then(data => {
      const users = [
        User.create({
          username: 'admin',
          email: 'admin@admin.ru',
          password: 'admin',
          addresses: [{
            type: 'самовывоз',
            line1: faker.address.streetAddress(),
            line2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode(),
          }],
        }, {
          include: [{
            model: Address,
            as: 'addresses',
          }],
        }),
        User.create({
          username: 'test',
          email: 'test@test.ru',
          password: 'test',
          addresses: [{
            type: 'самовывоз',
            line1: faker.address.streetAddress(),
            line2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode(),
          }],
        }, {
          include: [{
            model: Address,
            as: 'addresses',
          }],
        }),
        Category.bulkCreate([
          { name: 'из дерева', description: 'фанера 3мм-5мм' },
          { name: 'из акрила', description: 'акрил 3мм-5мм' },
          { name: 'другое', description: 'разный материал' },
        ]),
      ]
      for (let i = 0; i < 10; i++) {
        users.push(User.create({
          username: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.name.findName(),
          addresses: [{
            type: 'самовывоз',
            line1: faker.address.streetAddress(),
            line2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode(),
          }],
        }, {
          include: [{
            model: Address,
            as: 'addresses',
          }],
        }))
      }

      return Promise.all(users)
        .then(result => {
          res.json(result)
        }).catch(err => {
          res.json(err)
        })
    })
})

router.get('/bulk_unfinished', (req, res) => {
  // todo ask somemody about it
  const data = [
    {
      id: 12,
      username: 'admin',
      email: 'admin@admin.ru',
      password: 'admin',
    },
    {
      id: 11,
      username: 'test',
      email: 'test@test.ru',
      password: 'test',
    },
  ]
  for (let i = 0; i < 2; i++) {
    const obj = {}
    obj.username = faker.name.findName()
    obj.email = faker.internet.email()
    obj.password = faker.internet.email()
    obj.addresses = [{
      type: 'самовывоз',
      line1: faker.address.streetAddress(),
      line2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      user_id: i + 1,
    }]
    data.push(obj)
  }

  User.bulkCreate(data, {
    returning: true,
    individualHooks: true,
    include: [{
      model: Address,
      as: 'addresses',
    }],
  })
    .then((data) => {
      console.log('here', data)
      res.json(data)
    //   return User.findAll()
    // })
    // .then((response) => {
    //   res.json(response)
    })
    .catch((error) => {
      res.json(error)
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
      zip: '78704',
    }],
  }, {
    include: [{
      // include: [ User.Addresses ],
      association: User.Addresses,
    }],
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
