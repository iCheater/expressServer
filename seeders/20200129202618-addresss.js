'use strict'
const faker = require('faker')
const { User } = require('./../models')
// npx sequelize-cli db:seed --seed 20200129202618-addresss.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll()

    const addresses = []
    for (let i = 0; i < users.length; i++) {
      addresses.push({
        type: 'самовывоз',
        textAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: users[i].id,
      })
    }

    return queryInterface.bulkInsert('Addresses', addresses, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Addresses', null, {
      // validate: false,
    })
  },
}
// todo good seeding example
// https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa
//
