const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('contacts2')
})

module.exports = router
