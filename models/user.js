const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'This email is already taken.',
        fields: ['email'],
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    gender: {
      type: DataTypes.ENUM('MALE', 'FEMALE'),
      allowNull: true,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      // defaultValue: 'urlToImage', // todo add default image

      //"/images/avatar-default.svg"
    },

  }, {
    underscored: true,
    hooks: {
      beforeCreate: (user) => {
        user.setPassword()
      },
      beforeUpdate: (user) => {
        user.setPassword()
      },
    },
  })

  User.prototype.setPassword = function () {
    if (this.changed('password')) {
      this.password = User.encryptPassword(this.password)
    }
  }

  User.encryptPassword = function (password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
  User.generatePassword = function () {
    return Math.floor(Math.random() * (99999 - 10000) - 10000).toString()
  }

  // todo there is no-return-await
  User.prototype.validPassword = function (password) {
    // console.log('password === this.password', password === this.password)
    // console.log('password', password)
    // console.log('this.password', this.password)
    // console.log('this', this)
    // return password === this.password
    return bcrypt.compare(password, this.password)
  }

  return User
}
