'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bonuses = []
    const arr = [
      {
        title: 'Бесплатная доставка от ',
        bonusStart: '400000',
      },
      {
        title: 'Прочая упаковка от ',
        bonusStart: '500000',
      },
      {
        title: 'Эксклюзивная упаковка от ',
        bonusStart: '1000000',
      },
    ]
    for (let i = 0; i < arr.length; i++) {
      bonuses.push({
        title: arr[i].title,
        bonusStart: arr[i].bonusStart,
        status: 'ACTIVE', // 'ACTIVE'
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    return queryInterface.bulkInsert('bonuses', bonuses, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bonuses', null, {})
  },
}
