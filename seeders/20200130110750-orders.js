'use strict'
const faker = require('faker')

module.exports = {

  up: (queryInterface, Sequelize) => {
    const orders = []
    const shipping = ['курьером', 'почта']
    for (let i = 0; i < 50; i++) {
      orders.push({
        // userName: faker.name.findName(),
        // address: faker.address.streetAddress(),
        promoCode: 'xxx-xxx-xxx-xxx',
        comment: 'comments',
        shipping: shipping[Math.round(Math.random())],
        // phone: faker.phone.phoneNumber(),
        // email: faker.internet.email(),
        status: 'CREATED', // CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED
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
