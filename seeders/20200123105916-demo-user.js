'use strict'
const faker = require('faker')
const { User } = require('./../models')
const bcrypt = require('bcrypt')

// sequelize db:seed --seed seeders/20200123105916-demo-user.js
// sequelize db:seed:undo --seed seeders/20200123105916-demo-user.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10)
    const users = []
    users.push(
      {
        // id: 1,
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 2,
        username: 'test',
        email: 'test@test.com',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )
    for (let i = 0; i < 10; i++) {
      users.push({
        // id: i + 2,
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.name.findName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    // const usersFromdb = await User.findAll()

    // return queryInterface.bulkInsert('Users', users, {
    //   returning: true,
    //   individualHooks: true,
    //   validate: true,
    return User.bulkCreate(users, {
      validate: true,
      individualHooks: true,
    }).then(data => {
      console.log(data)
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
// todo good seeding example
// https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa
//
