const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
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
    description: DataTypes.TEXT,
  }, {
  })

  return Category
}
