const LocalStrategy = require('passport-local').Strategy
const appRoot = require('app-root-path')
const { User, Address } = require(`${appRoot}/models`)

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
    let t

    try {
      user = await User.findOne({
        where: { email: email },
      })

      if (!user) {
        t = await sequelize.transaction()

        user = await User.create({
          email: email,
          password: password,

        }, { transaction: t })

        await t.commit()
      }
      return done(null, user)
    } catch( err) {
        if (t) {
          await t.rollback()
        }
        return done(err)
      }
  },
)

module.exports = local
