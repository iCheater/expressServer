const express = require('express')
const router = express.Router()
const loginRouter = require('./login')
const signupRouter = require('./signup')
const resetPassword = require('./resetPassword')

router.use('/signup/', signupRouter)
router.use('/login/', loginRouter)
router.use('/resetpassword/', resetPassword)

module.exports = router
