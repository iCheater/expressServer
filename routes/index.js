'use strict'
const appRoot = require('app-root-path')
const resLocals = require('../middleware/resLocals')
const clearCookie = require('../middleware/clearCookie')
// const clientErrorHandler = require('../middleware/clientErrorHandler')
// const errorHandler = require('../middleware/errorHandler')
// const logErrors = require('../middleware/logErrors')
const pageNotFoundHandler = require('../middleware/pageNotFoundHandler')
const { logErrors, clientErrorHandler, errorHandler } = require(`${appRoot}/helpers/error`)

const homeRouter = require('./home')

const adminRouter = require('./admin/')
const catalogRouter = require('./catalog')
const testRouter = require('./fortest')
const profileRouter = require('./profile')
const authRouter = require('./auth')
const ordersRouter = require('./admin/orders')
const cartRouter = require('./cart')
const servicesRouter = require('./services')
const contactsRouter = require('./contacts')
const orderRouter = require('./order')

const express = require('express')
const router = express.Router()

router.use(resLocals)
router.use(clearCookie)

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
router.use('/cart/', cartRouter)
router.use('/services/', servicesRouter)
router.use('/contacts/', contactsRouter)
router.use('/order/', orderRouter)

// router.use((req, res, next) => { setTimeout(next, 3000) })
// //admin
router.use('/admin/', adminRouter)

// //admin //orders
router.use('/orders/', ordersRouter)

// test
router.use('/test', testRouter)

// router.all('/api/*', requireAuthentication)

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
router.use(pageNotFoundHandler)
router.use(logErrors)
router.use(clientErrorHandler)
router.use(errorHandler)

module.exports = router
