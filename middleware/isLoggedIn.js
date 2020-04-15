const isLoggedIn = (req, res, next) => {
  // if (!req.session.user && !req.cookies.user_sid) {
  //   console.log('sessionChecker. redirect!!')
  //   res.redirect('/login')
  // } else {
  //   next()
  // }
  if (req.isAuthenticated()) { return next() }
  res.redirect('/login')
}

module.exports = isLoggedIn
