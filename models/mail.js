'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  const Mail = sequelize.define('Mail', {
    status: {
      type: DataTypes.ENUM('CREATED', 'FAILED', 'SENT', 'RECEIVED'),
      defaultValue: 'CREATED',
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('ORDER', 'PASSWORD_RESET', 'EMAIL_CONFIRMATION'),
      allowNull: false,
    },
  })

  return Mail
}
