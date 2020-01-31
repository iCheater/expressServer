const express = require('express')
const router = express.Router()
const { User } = require('../../models')

router.get('/', (req, res, next) => {
  console.log('signup get')
  res.render('auth/signup')
})

router.post('/', (req, res) => {
  console.log('Got body:', req.body)

  var params = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }
  console.table(params)
  User.create(params)
    .then((user) => {
      var msg = {
        message: 'form data loaded',
        status: 'ok',
        data: user,
      }

      // res.json(msg);
      req.session.user = user.dataValues
      console.log(msg)
      res.redirect('/')
    })
    .catch(error => {
      console.error(error)
      res.json(error)
      // res.redirect('/err');
    })
})

// guide https://www.codementor.io/@mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3

// router.route('/')
//     .get(sessionChecker, (req, res) => {
//         res.render('signup');
//     })
//     .post((req, res) => {
//         console.log('signupsignupsignupsignup');
//         User.create({
//             login: req.body.login,
//             password: req.body.password,
//             email: req.body.email
//         })
//             .then(user => {
//                 req.session.user = user.dataValues;
//                 res.redirect('/dashboard');
//             })
//             .catch(error => {
//                 res.redirect('/signup');
//             });
//     });

module.exports = router
