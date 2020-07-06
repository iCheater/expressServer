const { DataTypes } = require('sequelize')

module.exports =  (sequelize) => {
  const Address = sequelize.define('Address', {
    //new strings
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    country:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    postcode:{
      type: DataTypes.STRING,
      allowNull: true,
    },

  }, {
    //
  })

  return Address
}
