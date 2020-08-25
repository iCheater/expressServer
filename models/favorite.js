const { DataTypes } = require('sequelize')

module.exports =  (sequelize) => {
  const Favorite = sequelize.define('Favorite', {
    //new strings
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //мб удалить статус?
  }, {

  })

  return Favorite
}
