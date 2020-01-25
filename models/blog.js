const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  var Blog = sequelize.define('Blog', {
    name: DataTypes.STRING,
    mURL: DataTypes.STRING,
    description: DataTypes.TEXT
  })

  return Blog
}
