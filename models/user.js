const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      },
    },
  })

  // todo there is no-return-await
  User.prototype.validPassword = function (password) {
    console.log('password === this.password', password === this.password)
    console.log('password', password)
    console.log('this.password', this.password)
    console.log('this', this)
    // return password === this.password
    return bcrypt.compare(password, this.password)
  }

  return User
}
