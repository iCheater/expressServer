'use strict'
const faker = require('faker')
const { User } = require('./../models')
//  npx sequelize-cli db:seed --seed seeders/20200123105916-demo-user.js
// npx sequelize-cli db:seed:undo --seed seeders/20200123105916-demo-user.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = []
    for (let i = 0; i < 100; i++) {
      users.push({
        // id: i + 2,
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        verified: true,
        avatarUrl: faker.image.avatar(),
        created_at: new Date(),
        updated_at: new Date(),
      })
    }
    users[0].username = 'admin'
    users[0].email = 'admin@admin.com'
    users[0].password = 'admin'
    users[1].username = 'test'
    users[1].email = 'test@test.com'
    users[1].password = 'test'

    return User.bulkCreate(users, {
      validate: true,
      individualHooks: true,
    })
      .then(data => {
        // console.log(data)
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  },
}
