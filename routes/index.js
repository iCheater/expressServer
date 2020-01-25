'use strict'
const homeRouter = require('./home')

const adminRouter = require('./admin/')
const catalogRouter = require('./catalog')
const testRouter = require('./test')
const profileRouter = require('./profile')
const authRouter = require('./auth')

const express = require('express')
const router = express.Router()


router.use('/', homeRouter)
router.use('/', authRouter)

// todo страница profile
// просмотр текущего заказа
// Просмотр истории заказов,
// Посмотреть содержимое корзины
// Посмотреть отложенные товары
// Изменить профиль(данные, адреса, пароль, почта, телефоны)
router.use('/profile/', profileRouter)
router.use('/catalog/', catalogRouter)

// //admin
router.use('/admin/', adminRouter)

// test
router.use('/test', testRouter)





router.use((req, res) => {
  res.status(404)

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.protocol + '://' + req.get('host') + req.originalUrl })
    return
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' })
    return
  }

  // default to plain-text. send()
  res.type('txt').send('Not found')
})


// router.use((req, res) => {
//   res.status(500)
//
//   // respond with html page
//   if (req.accepts('html')) {
//     res.render('404', { url: req.url })
//     return
//   }
//
//   // respond with json
//   if (req.accepts('json')) {
//     res.send({ error: 'Not found' })
//     return
//   }
//
//   // default to plain-text. send()
//   res.type('txt').send('Not found')
// })

module.exports = router
