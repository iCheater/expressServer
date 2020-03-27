const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = function (passport, user) {
  const User = user

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', // key that we send with form or json
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
    findOrCreateUser = function () {
      User.findOne(
        { where: { email: email } })
        .then((user) => {
          if (user) {
            return done(null, false, { message: 'That email is already taken' })
          } else {
            var userPassword = createHash(password)
            var data =
              {
                email: email,
                password: userPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
              }

            User.create(data)
              .then((newUser, created) => {
                if (!newUser) {
                  return done(null, false)
                }

                if (newUser) {
                  return done(null, newUser)
                }
              })
          }
        })
    }
    // Delay the execution of findOrCreateUser and execute the method
    // in the next tick of the event loop
    process.nextTick(findOrCreateUser) ///  <<<<< IS THIS GOOD OR NOT ? WHY?
  }),
  )

  // Generates hash using bCrypt
  var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
  }
}
