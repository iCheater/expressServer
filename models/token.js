'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = (sequelize) => {
  const Token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      required: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      required: true,
    },
    // deleted: {
    //   type: DataTypes.BOOLEAN,
    // },
  }, {
    tableName: 'tokens',
    paranoid: true,
    hooks: {
      beforeCreate: async (token) => {
        token.token = await token.generateToken() // todo check for unique?

        console.log(token.type)
        switch (token.type) {
          case 'confirmation': {
            token.expirationDate = new Date(Date.parse(token.createdAt) + 60 * 60 * 24 * 1000) // 24h
            break
          }
          case 'resetPassword': {
            token.expirationDate = new Date(Date.parse(token.createdAt) + 60 * 60 * 24 * 1000) // 24h
            break
          }
          default : {
            console.error('toke must have type!')
          }
        }
      },
    },
  })

  Token.prototype.generateToken = function (password) {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let token = ''
    for (let i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
    }
    return token
  }

  return Token
}
