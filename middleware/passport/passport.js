const passport = require('passport')
const localLogin = require('./local-login')
const yandex = require('./strategies/yandex')

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})
// used to deserialize the user
// passport.deserializeUser((id, done) => {
//   // User.findById(id).then(function(user) {
//   User.findByPk(id).then((user) => {
//     if (user) {
//       done(null, user.get())
//     } else {
//       done(user.errors, null)
//     }
//   })
// })

passport.use(localLogin)
passport.use(yandex)

module.exports = passport
