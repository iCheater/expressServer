const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    tableName: 'tags', // in base
  })

  return Tag
}
