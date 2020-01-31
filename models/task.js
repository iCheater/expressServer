'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
  })

  // Task.associate = function (models) {
  //     models.Task.belongsTo(models.User, {
  //         onDelete: "CASCADE",
  //         foreignKey: {
  //             allowNull: false
  //         }
  //     });
  // };

  return Task
}
