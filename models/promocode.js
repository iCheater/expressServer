const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Promocode = sequelize.define('Promocode', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      defaultValue: 'INACTIVE',
      allowNull: false,
    },
  }, {
    tableName: 'promocodes',
  })

  return Promocode
}
