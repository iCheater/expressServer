'use strict'
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tags = []

    for (let i = 0; i < 1000; i++) {
      tags.push({
        name: faker.commerce.productMaterial(),
        description: 'описание к тегу',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert('tags', tags, {})
      .catch(err => {
        console.log(err)
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {})
  },
}
