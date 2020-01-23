const express = require('express')
const router = express.Router()
const loginRouter = require('./login')
const signupRouter = require('./signup')

router.use('/signup/', signupRouter)
router.use('/login/', loginRouter)

module.exports = router
