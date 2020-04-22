const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Promocode = sequelize.define('Promocode', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        isInt: true,
        msg: 'Must be an integer number',
      },
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      defaultValue: 'INACTIVE',
      allowNull: false,
    },
    counter: DataTypes.INTEGER,
    counterLimit: DataTypes.INTEGER,
    discountPercent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discountCurrency: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finishAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'promocodes',
  })

  return Promocode
}
