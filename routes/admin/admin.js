const express = require('express')
const router = express.Router()

// router.use(function (req, res, next) {
//     console.log('admin router !! Time:', Date.now());
//     next()
// });

// router.get('/', (req, res, next) => {
//   res.render('admin/admin')
// })

router.get('/', (req, res, next) => {
  res.render('admin/mainBlock')
})

module.exports = router
