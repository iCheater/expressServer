'use strict'
const { Product, Tag } = require('./../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll()
    const tags = await Tag.findAll()

    const productTag = []
    const maxTagsPerProduct = 20
    const minTagsPerProduct = 1
    function random () {
      return Math.floor(Math.random() * maxTagsPerProduct) + minTagsPerProduct
    }

    for (let i = 0; i < products.length; i++) {
      // deep copy for every order
      const tagsClone = JSON.parse(JSON.stringify(tags))
      for (let j = 0; j < random(); j++) {
        const randIndex = Math.floor(Math.random() * (tagsClone.length))
        // Cut random product from productsClone. We need to be sure, that we dont have identical products in one order.
        const tag = tagsClone.splice(randIndex, 1)
        productTag.push({
          product_id: products[i].id,
          tag_id: tag[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }

    return queryInterface.bulkInsert('product_tag', productTag, {})
      .catch(err => {
        console.log(err)
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_tag', null, {})
  },
}
