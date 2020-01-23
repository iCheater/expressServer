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

router.use('/test', testRouter)

module.exports = router
