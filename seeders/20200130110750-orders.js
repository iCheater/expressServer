'use strict'
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [{
      userName: faker.name.findName(),
      address: faker.address.streetAddress(),
      promoCode: 'xxx-xxx-xxx-xxx',
      comment: 'comments',
      shipping: 'курьером',
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      status: 'в обработке',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {})
  },
}
