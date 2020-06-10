const LocalStrategy = require('passport-local').Strategy
const appRoot = require('app-root-path')
const { User, Address, sequelize } = require(`${appRoot}/models`)

const local = new LocalStrategy(
  {
    // usernameField: 'username', // key that we send with form or json
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  // (req, email, password, done) => {
  //   console.log('passport-local')
  //   console.log('email', email)
  //   // User.findOne({
  //   //   where: { email: email },
  //   //   include: { model: Address, as: 'addresses' },
  //   // })
  //   //   .then(async (user) => {
  //   //     console.log('user', user)
  //   //     if (!user) {
  //   //       //create user
  //   //       return done(null, false)
  //   //     }
  //   //
  //   //
  //   //     if (!await user.validPassword(password)) { return done(null, false) }
  //   //     // req.session.user = user.dataValues
  //   //     return done(null, user)
  //   //   })
  //   //   .catch(err => {
  //   //     return done(err)
  //   //   })
  // },

  async (req, email, password, done) => {
    console.log('passport-local')
    console.log('email', email)
    let user
    try {
      user = await User.findOne({
        where: { email: email },
      })

      if(!user) {
        user = await User.create({
          email: email,
          password: password,
          username: email,
        })
        console.log(`User [${user}] created`)
        return done(null, user)
      }
      else if (!await user.validPassword(password)){
        // console.log('User password is invalid')
        return done(null, false, "User password is invalid")
        // return done(null, false, req.flash("errPassword","User or password is invalid."))
        // return done(null, false, {message: 'User password is invalid'})
      }
      else {
        console.log('Login and password are valid')
        return done(null, user)
      }


    } catch(err) {
        return done(err)
      }
  },
)

module.exports = local
