'use strict'
const faker = require('faker')
const { User } = require('./../models')
// sequelize db:seed --seed 20200129202618-addresss.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findOne({
      where: {
        email: 'admin@admin.com',
      },
    })

    return queryInterface.bulkInsert('Addresses', [{
      type: 'самовывоз',
      line1: faker.address.streetAddress(),
      line2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id: user.id,
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Addresses', null, {})
  },
}
// todo good seeding example
// https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa
//
