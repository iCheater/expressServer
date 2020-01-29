'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
// todo good seeding example
// https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa
//
