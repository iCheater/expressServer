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
    price: DataTypes.DECIMAL,
    mURL: DataTypes.STRING,
    description: DataTypes.TEXT,
    features: DataTypes.JSONB,
  }, {
    tableName: 'products',
    // underscored: true, // this will make mURL into m_u_r_l

  })

  return Product
}
