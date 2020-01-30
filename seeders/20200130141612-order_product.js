'use strict'
const { Product } = require('./../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const product = await Product.findAll()

    const order_product = [
      {
        order_id: 1,
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 1,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 1,
        product_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    return queryInterface.bulkInsert('order_product', order_product, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_product', null, {})
  },
}
