const express = require('express')
const addressRouter = express.Router()

const addressController = require('../../controllers/addresses')

addressRouter.post('/', addressController.create)
addressRouter.get('/:id', addressController.read)
addressRouter.put('/:id', addressController.update)
addressRouter.delete('/:id', addressController.delete)

module.exports = addressRouter
