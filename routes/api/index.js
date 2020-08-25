const express = require('express')
const router = express.Router()

const address = require('./address')
const user = require('./user')
const favorite = require('./favorite')

router.use('/address', address)
router.use('/user', user)
router.use('/favorite', favorite)


module.exports = router
