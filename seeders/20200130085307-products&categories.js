'use strict'
const faker = require('faker')
// const { Products } = require('./../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = []
    for (let i = 0; i < 5; i++) {
      categories.push({
        id: i + 1,
        name: faker.commerce.department(),
        description: 'фейковый тег',
        featuresFilter: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    const products = []
    for (let i = 0; i < 100; i++) {
      products.push({
        name: faker.commerce.product(),
        price: faker.commerce.price(0.1, 9999.99, 2),
        mURL: faker.image.avatar(),
        description: faker.commerce.productName(),
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
    ]
    return Promise.all(promises)
  },
}
// todo good seeding example
// https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa
//
