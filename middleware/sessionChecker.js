const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    console.log('sessionChecker. redirect!!')
    res.redirect('/login')
  } else {
    next()
  }
}

module.exports = sessionChecker
