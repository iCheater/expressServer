const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Address = sequelize.define('Address', {
    type: DataTypes.STRING,
    textAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
  }, {
    //
  })

  return Address
}
