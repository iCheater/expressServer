'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  var Role = sequelize.define('Role', {
    role: DataTypes.STRING
  })

  return Role
}
