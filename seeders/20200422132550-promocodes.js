'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const promocodes = []
    promocodes.push({
      name: 'singleTimeCode',
      description: 'description code',
      status: 'ACTIVE',
      counter: 0,
      counterLimit: 1,
      discountPercent: 20,
      discountCurrency: 0,
      startAt: null,
      finishAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    promocodes.push( {
      name: 'testCounter',
      description: 'description code',
      status: 'INACTIVE',
      counter: 0,
      counterLimit: 10,
      discountPercent: 15,
      discountCurrency: 0,
      startAt: null,
      finishAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    promocodes.push( {
      name: 'testInactive',
      description: 'description code',
      status: 'ACTIVE',
      counter: 0,
      counterLimit: 30,
      discountPercent: 10,
      discountCurrency: 0,
      startAt: null,
      finishAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    promocodes.push({
      name: 'testDataStart',
      description: 'description code',
      status: 'INACTIVE',
      counter: 0,
      counterLimit: 100,
      discountPercent: 10,
      discountCurrency: 0,
      startAt: null,
      finishAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    promocodes.push({
      name: 'testDataFinish',
      description: 'description code',
      status: 'ACTIVE',
      counter: 0,
      counterLimit: 15,
      discountPercent: 1,
      discountCurrency: 0,
      startAt: null,
      finishAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return queryInterface.bulkInsert('promocodes', promocodes, {})
      .catch(err => {
        console.error(err)
      })

  },



  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('promocodes', null, {})
  }
};
