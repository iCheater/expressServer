const express = require('express')
const router = express.Router()

const address = require('./address')
const user = require('./user')

router.use('/address', address)
router.use('/user', user)


module.exports = router
