'use strict'
const { Product, Order } = require('./../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll()
    const orders = await Order.findAll()

    const orderItems = []
    const maxProductsPerItem = 20
    const minProductsPerItem = 1
    function random () {
      return Math.floor(Math.random() * maxProductsPerItem) + minProductsPerItem
    }

    for (let i = 0; i < orders.length; i++) {
      const product = products[Math.floor(Math.random() * (products.length))]
      const obj = {
        quantity: random(),
        order_id: orders[i].id,
        product_id: product.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      obj.subTotal = obj.quantity * product.sellingPrice
      orderItems.push(obj)
    }
    return queryInterface.bulkInsert('OrderItems', orderItems, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrderItems', null, {})
  },
}
