'use strict'
const faker = require('faker')
const { Product, Category } = require('./../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        name: 'Обложки',
        description: 'описание обложек',
        featuresFilter: JSON.stringify({ test: 'test' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Орнаменты',
        description: 'разные геометрические формы',
        featuresFilter: JSON.stringify({ test: 'test' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Фигурки',
        description: 'Ну вы поняли',
        featuresFilter: JSON.stringify({ test: 'test' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Подставки',
        description: 'разный материал',
        featuresFilter: JSON.stringify({ test: 'test' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Корпусы',
        description: 'разный материал',
        featuresFilter: JSON.stringify({ test: 'test' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Мебель',
        description: 'разный материал',
        featuresFilter: JSON.stringify({ test: 'test' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Светильники',
        description: 'разный материал',
        featuresFilter: JSON.stringify({ test: 'test' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    for (let i = 0; i < 5; i++) {
      categories.push({
        name: faker.commerce.department(),
        description: 'фейковый тег',
        featuresFilter: JSON.stringify({ test: 'test' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    // const products = await Product.findAll()
    // products.forEach(product => {
    //   console.log(product)
    //   console.log('products.length', products.length)
    //
    // })
    // console.log('products.length', products.length)


    return queryInterface.bulkInsert('Categories', categories, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  },
}

// 'use strict'
// const { Product, Category } = require('./../models')
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//      const products = await Product.findAll()
//     const categories = await Category.findAll()
//     const rawCategories = categories.map(e => e.get({ row: true }))
//     // console.log('rawCategories', rawCategories)
//     rawCategories.forEach(category => {
//       console.log('here')
//       Product.findAll({
//         // attributes: ['features'],
//         // include: [{
//         //   model: Category,
//         //   where: { id: category.id },
//         // }],
//       }).then(productsOfCategory => {
//         console.log(productsOfCategory)
//       }).catch(err => {
//         console.log(err)
//       })
//     })
//     return queryInterface.bulkInsert('Categories', rawCategories, {
//       updateOnDuplicate: ['featuresFilter'],
//     })
//   },
//
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Categories', null, {
//     })
//   },
// }
