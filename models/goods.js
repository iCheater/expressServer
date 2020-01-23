const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
  var Good = sequelize.define('Good', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
        msg: 'Must be an integer number'
      }
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    mURL: DataTypes.STRING,
    description: DataTypes.TEXT
    // category: DataTypes.STRING
  }, {
    // classMethods: {
    //     associate: function(models) {
    //         Good.belongsToMany(models.Category, { through: 'goodCategory' })
    //     }
    // }
  })
  // Good.associate = function(models) {
  //     models.Good.belongsToMany(models.Category, {
  //         through: 'goodCategory',
  //         foreignKey: 'goodId',
  //         as: 'goods'
  //     })
  // };

  return Good
}
