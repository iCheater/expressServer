'use strict'
const { Product, Category } = require('./../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll()
    const categories = await Category.findAll()

    const productCategory = []

    for (let i = 0; i < products.length; i++) {
      productCategory.push({
        category_id: categories[Math.floor(Math.random() * categories.length)].id,
        product_id: products[i].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert('product_category', productCategory, {})
      .catch(err => {
        console.log(err)
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_category', null, {})
  },
}
