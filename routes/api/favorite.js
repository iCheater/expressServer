const express = require('express')
const favoriteRouter = express.Router()

const favoriteController = require('../../controllers/favorite')

favoriteRouter.post('/', favoriteController.create)
favoriteRouter.get('/:id', favoriteController.read)
favoriteRouter.put('/:id', favoriteController.update)
favoriteRouter.delete('/:id', favoriteController.delete)

module.exports = favoriteRouter
