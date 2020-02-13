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
    nameURL: DataTypes.STRING,
    description: DataTypes.TEXT,
    featuresFilter: DataTypes.JSONB,
  }, {
    // https://www.npmjs.com/package/sequelize-hierarchy
    hierarchy: {
      foreignKey: 'parent_id',
      levelFieldName: 'hierarchy_level',
      throughTable: 'categories_ancestors',
    },
  })

  Category.rebuildHierarchy()

  return Category
}
