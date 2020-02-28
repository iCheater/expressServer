const express = require('express')
const router = express.Router()
const { Order, User, Address, OrderItem, Product } = require('../models')

router.get('/', (req, res, next) => {
  Order.findAll({
    where: {
      id: 1,
    },
    limit: 10,
    include: [
      {
        model: OrderItem,
        as: 'items',
        include: [{
          model: Product,
        }],
      },
      {
        model: User,
        as: 'user',
      }],
  }).then(orders => {
    res.json(orders)
  })
})
// придумать удобную структуру данных в сессии без дублирования
// создание пользователя после создания заказа
function validateAuthorless () {
  console.warn('vаlidateAuthorless() IS NOT IMPLEMENTED')
  return true
}

router.get('/neworder', (req, res, next) => {
  // ситуэйшны:
  // - Я зареган, сделал заказ, но забыл авторизоваться, предлагаем авторизоваться на этапе оформления
  // - Я зареган, сделал заказ указав другого получателя

  if (!req.session.cart) {
    return res.render('error', { message: 'ошибка, у вас пустая корзина' })
  }

  if (!req.session.user) {
    if (validateAuthorless(req.session.authorless)) {
      return res.render('error', { message: 'данные пользователя не валидны' })
    }
    User.create({
      username: req.session.authorless.username,
      email: req.session.authorless.email,
      password: Math.floor(Math.random() * 100), // todo
      phone: req.session.authorless.phone,
    })
      .then(user => {
        Address.create({
          textAddress: req.session.authorless.address,
        })
          .then(address => {
            // user.addAddresses[address.id]
          })
      })
  }
  // // todo какое имя применить в заказе, если ты уже зарегистрирован?
  Order.create({
    promoCode: req.session.authorless.order.promoCode, // todo
    comment: req.session.authorless.order.comment, // todo
    shipping: req.session.authorless.order.shipping,
    status: 'в обработке',
  })
    .then(order => {
      const productIDs = Object.keys(req.session.cart)
      const cartItems = []
      for (const productID of productIDs) {
        const cartItem = {}
        cartItem.quantity = req.session.cart[productID].quantity
        cartItem.subTotal = req.session.cart[productID].subTotal
        cartItem.product_id = productID
      }

      OrderItem.bulkCreate(cartItems, { returning: true })
        .then(orderItems => {
          res.json(orderItems)
        })

      // user.addOrder[order.id],
      // mailer.sendOrder(user)
      res.json(order)
      // redirect('/order' + order.id)
    })
})

router.get('/order:id', (req, res, next) => {
  Order.findByPk(req.params.id, {
    include: {
      model: User,
      include: {
        model: Address,
      },
    },
  })
    .then(order => {
      res.json(order)
    })
})

router.get('/list', (req, res, next) => {
  Order.findAll({
    include: {
      model: User,
      include: {
        model: Address,
      },
    },
  })
    .then(order => {
      res.json(order)
    })
})

module.exports = router
