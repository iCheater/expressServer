const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  const socialAuth = sequelize.define('SocialAuth', {
    name: DataTypes.STRING,
    social_id: DataTypes.STRING, // later check if BIGINT is suitable
    external_profile: DataTypes.JSONB,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
  }, {
    tableName: 'socialAuth',
  })

  return socialAuth
}
