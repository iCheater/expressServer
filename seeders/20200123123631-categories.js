'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: 'cats',
      description: 'thats for animals',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'dogs',
      description: 'thats for animals',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
}
