const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Address = sequelize.define('Address', {
    type: DataTypes.STRING,
    line1: DataTypes.STRING,
    line2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    //
  })

  return Address
}
