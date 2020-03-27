const passport = require('passport')
const localLogin = require('./local-login')
const yandex = require('./strategies/yandex')
const appRoot = require('app-root-path')
const { User, Address, SocialAuth } = require(`${appRoot}/models`)

// criticaly usefull
// https://stackoverflow.com/questions/45381931/basics-of-passport-session-expressjs-why-do-we-need-to-serialize-and-deseriali

// When Authentication is valid SERIALIZE METHOD IS EXECUTED (to begin a session)
// (which uses whatever parameter is passed in the definition of the method )
// usually User.id is saved and is verified each time a request is sent.
// In the above method, user object is passed and user._id is saved as a key in the server.
// This means that this key(user.id) would be used to maintain the session.
// This is done by saving the user._id in the req.passport.session.user ={_id : …}
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

// Serialize method is executed only once after authentication, and later on,
// for subsequent requests the DESERIALIZE METHOD gets executed which maintains the session in which
// the User.id is passed to maintain the session as illustrated below. ( till the browser is open*) .
// passport.deserializeUser(function(id, done){…})
// user object is returned in the callback and is attached to the request as req.user.
// passport.deserializeUser((id, done) => {
//   console.log('deserializeUser with id: ', id)
//   User.findByPk(id)
//     .then((user) => {
//       if (user) {
//         done(null, user.get())
//       }
//     })
//     .catch(err => {
//       done(err, null)
//     })
// })

passport.use(localLogin)
passport.use(yandex)

module.exports = passport
