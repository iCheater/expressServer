'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: DataTypes.INTEGER,
    // subTotal: DataTypes.INTEGER,
  })

  return OrderItem
}
