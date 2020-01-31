'use strict'
const faker = require('faker')
// const { Products } = require('./../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = []

    for (let i = 0; i < 100; i++) {
      products.push({
        name: faker.commerce.product(),
        price: faker.commerce.price(0, 9999, 2),
        mURL: faker.image.avatar(),
        description: faker.commerce.productName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert('Products', products, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {
      // validate: false,
    })
  },
}
// todo good seeding example
// https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa
//
