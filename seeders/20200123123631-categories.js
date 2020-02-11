'use strict'
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = [
      {
        name: 'Обложки',
        description: 'описание обложек',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Орнаменты',
        description: 'разные геометрические формы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Фигурки',
        description: 'Ну вы поняли',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Подставки',
        description: 'разный материал',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Корпусы',
        description: 'разный материал',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Мебель',
        description: 'разный материал',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Светильники',
        description: 'разный материал',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    for (let i = 0; i < 5; i++) {
      categories.push({
        name: faker.commerce.department(),
        description: 'фейковый тег',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert('Categories', categories, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  },
}
