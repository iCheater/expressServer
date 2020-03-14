const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('contacts')
})

module.exports = router
