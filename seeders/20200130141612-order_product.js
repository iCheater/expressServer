'use strict'
const { Product, Order } = require('./../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll()
    const orders = await Order.findAll()

    const orderProducts = []
    const maxProductsPerOrder = 20
    const minProductsPerOrder = 1
    function random () {
      return Math.floor(Math.random() * maxProductsPerOrder) + minProductsPerOrder
    }

    for (let i = 0; i < orders.length; i++) {
      // deep copy for every order
      const productsClone = JSON.parse(JSON.stringify(products))
      for (let j = 0; j < random(); j++) {
        const randIndex = Math.floor(Math.random() * (productsClone.length))
        // Cut random product from productsClone. We need to be sure, that we dont have identical products in one order.
        const product = productsClone.splice(randIndex, 1)
        orderProducts.push({
          order_id: orders[i].id,
          product_id: product[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }

    return queryInterface.bulkInsert('order_product', orderProducts, {})
      .catch(err => {
        console.log(err)
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_product', null, {})
  },
}
