const TwitterStrategy = require('passport-twitter').Strategy
const appRoot = require('app-root-path')
const { User, Address } = require(`${appRoot}/models`)
const config = require(`${appRoot}/config/passport`).twitter

const twitterStrategy = new TwitterStrategy({
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret,
  callbackURL: config.callbackURL,
},
(token, tokenSecret, profile, cb) => {
  User.findOrCreate({ twitterId: profile.id }, (err, user) => {
    return cb(err, user)
  })
})

module.exports = twitterStrategy
