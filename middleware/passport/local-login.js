const LocalStrategy = require('passport-local').Strategy
const appRoot = require('app-root-path')
const { User, Address } = require(`${appRoot}/models`)

const local = new LocalStrategy(
  {
    usernameField: 'username', // key that we send with form or json
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    console.log('passport-local')
    User.findOne({
      where: { username: username },
      include: { model: Address, as: 'addresses' },
    })
      .then(async (user) => {
        if (!user) { return done(null, false) }
        if (!await user.validPassword(password)) { return done(null, false) }
        req.session.user = user.dataValues
        return done(null, user)
      })
      .catch(err => {
        return done(err)
      })
  },
)

module.exports = local
