'use strict'
const faker = require('faker')
// const { Products } = require('./../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = []
    for (let i = 0; i < 10; i++) {
      categories.push({
        id: i + 1,
        name: faker.commerce.department(),
        description: 'фейковый тег',
        parent_id: i === 0 ? i : i + 1,
        featuresFilter: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    categories[0].parent_id = null
    categories[0].name = 'root'
    categories[0].description = 'root category to rule them all'
    categories[1].parent_id = 1
    categories[2].parent_id = 1
    categories[3].parent_id = 2
    categories[4].parent_id = 2
    categories[5].parent_id = 3
    categories[6].parent_id = 5

    const minCostPrice = 5000
    const maxCostPrice = 999999

    const products = []
    for (let i = 0; i < 100; i++) {
      const costPrice = Math.floor(Math.random() * (maxCostPrice - minCostPrice) + minCostPrice)
      products.push({
        name: faker.commerce.product(),
        costPrice: costPrice,
        sellingPrice: (costPrice * (Math.random() * (5 - 1) + 1).toFixed(2)).toFixed(),
        discountRate: Math.floor(Math.random() * (99 - 1) + 1),
        mURL: faker.image.avatar(),
        description: faker.commerce.productName(),
        stock: Math.floor(Math.random() * 99),
        category_id: categories[Math.floor(Math.random() * categories.length)].id,
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

    categories.forEach(category => {
      products.forEach(product => {
        if (category.id === product.category_id) {
          const mergedObj = { ...JSON.parse(category.featuresFilter), ...JSON.parse(product.features) }
          category.featuresFilter = JSON.stringify(mergedObj)
        }
      })
    })

    const promises = [
      queryInterface.bulkInsert('Categories', categories, {}),
      queryInterface.bulkInsert('products', products, {}),
    ]
    return Promise.all(promises).then(([categories, products]) => {})
  },

  down: async (queryInterface, Sequelize) => {
    const promises = [
      queryInterface.bulkDelete('Categories', null, {}),
      queryInterface.bulkDelete('products', null, {}),
      queryInterface.bulkDelete('categories_ancestors', null, {}),
    ]
    return Promise.all(promises)
  },
}
// todo good seeding example
// https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa
//
