'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = [
      {
        name: 'из дерева',
        description: 'фанера 3мм-5мм',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'из акрила',
        description: 'акрил 3мм-5мм',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'другое',
        description: 'разный материал',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    return queryInterface.bulkInsert('Categories', categories, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  },
}
