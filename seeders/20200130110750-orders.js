'use strict'
const faker = require('faker')

module.exports = {

  up: (queryInterface, Sequelize) => {
    const orders = []
    for (let i = 0; i < 50; i++) {
      orders.push({
        // userName: faker.name.findName(),
        // address: faker.address.streetAddress(),
        promoCode: 'xxx-xxx-xxx-xxx',
        comment: 'comments',
        shipping: 'курьером',
        // phone: faker.phone.phoneNumber(),
        // email: faker.internet.email(),
        status: 'в обработке',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      )
    }
    return queryInterface.bulkInsert('Orders', orders, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {})
  },
}
