const sessionChecker = (req, res, next) => {
  console.log('sessionChecker')
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect('/login')
  } else {
    next()
  }
}

module.exports = sessionChecker
