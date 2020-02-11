'use strict'
const faker = require('faker')
// const { Products } = require('./../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = []

    for (let i = 0; i < 100; i++) {
      products.push({
        name: faker.commerce.product(),
        price: faker.commerce.price(0.1, 9999.99, 2),
        mURL: faker.image.avatar(),
        description: faker.commerce.productName(),
        features: JSON.stringify({
          color: faker.commerce.color(),
          material: faker.commerce.productMaterial(),
          weight: (Math.random() * 10000).toFixed(3),
          dimensions: {
            width: (Math.random() * 100).toFixed(2),
            height: (Math.random() * 100).toFixed(2),
            depth: (Math.random() * 100).toFixed(2),
          },
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert('products', products, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {
      // validate: false,
    })
  },
}
// todo good seeding example
// https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa
//
