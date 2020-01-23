const express = require('express')
const router = express.Router()

const adminRouter = require('./admin')
const categoriesRouter = require('./categories')
const goodsRouter = require('./goods')
const taskRouter = require('./tasks')
const usersRouter = require('./users')
const ordersRouter = require('./orders')

const sessionChecker = require('../../middleware/sessionChecker')

router.use(sessionChecker)

router.use('/', adminRouter)
router.use('/categories/', categoriesRouter)
router.use('/goods/', goodsRouter)
router.use('/tasks/', taskRouter)
router.use('/users/', usersRouter)
router.use('/orders/', ordersRouter)

module.exports = router
