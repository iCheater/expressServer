const YandexStrategy = require('passport-yandex').Strategy
const appRoot = require('app-root-path')
const { User, Address } = require(`${appRoot}/models`)
const config = require(`${appRoot}/config/passport`).yandex
// todo check it https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize
const yandexStrategy = new YandexStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL,
},
(accessToken, refreshToken, profile, done) => {
  console.log(profile)
  console.log(accessToken)
  console.log(refreshToken)
  User.findOrCreate({
    where: { yandexId: profile.id },
  })
    .then((user) => {
      return done(null, user)
    })
    .catch(err => {
      return done(err)
    })
})

module.exports = yandexStrategy
