'use strict'
const faker = require('faker')
const { User } = require('./../models')

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll()

    const orders = []
    const shipping = ['Самовывоз', 'Курьерская доставка']
    for (let i = 0; i < 50; i++) {
      const user = users[Math.floor(Math.random() * (users.length))]
      orders.push({
        // userName: faker.name.findName(),
        // address: faker.address.streetAddress(),
        id: i + 1,
        promoCode: 'xxx-xxx-xxx-xxx',
        comment: 'comments',
        shipping: shipping[Math.round(Math.random())],
        // phone: faker.phone.phoneNumber(),
        // email: faker.internet.email(),
        status: 'CREATED', // CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED
        user_id: user.id,
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
