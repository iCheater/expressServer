const express = require('express')
const router = express.Router()

const adminRouter = require('./admin')
const categoriesRouter = require('./categories')
const productsRouter = require('./products')
const taskRouter = require('./tasks')
const usersRouter = require('./users')
const ordersRouter = require('./orders')
const tagsRouter = require('./tags')

const sessionChecker = require('../../middleware/sessionChecker')

router.use(sessionChecker)

router.use('/', adminRouter)
router.use('/categories/', categoriesRouter)
router.use('/products/', productsRouter)
router.use('/tasks/', taskRouter)
router.use('/users/', usersRouter)
router.use('/orders/', ordersRouter)
router.use('/tags/', tagsRouter)

module.exports = router
