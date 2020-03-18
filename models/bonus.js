const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Bonus = sequelize.define('Bonus', {
    bonusStart: DataTypes.INTEGER,
    title: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      defaultValue: 'INACTIVE',
      allowNull: false,
    },
  }, {
    tableName: 'bonuses',
  })

  return Bonus
}
