const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
  const Product = sequelize.define('Product', {
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
    price: DataTypes.FLOAT,
    mURL: DataTypes.STRING,
    description: DataTypes.TEXT,
  })

  return Product
}
