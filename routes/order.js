const express = require('express')
const router = express.Router()
const { Order, User, Address } = require('../models')

router.get('/', (req, res, next) => {
  const order = {
    cart: req.session.cart,
    order: req.session.authorless,
    user: req.session.user,
  }
  res.json(req.session)
})
// придумать удобную структуру данных в сессии без дублирования
// создание пользователя после создания заказа
function vаlidateAuthorless () {
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
    if (vаlidateAuthorless(req.session.authorless)) {
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
          line1: req.session.authorless.address,
        })
          .then(address => {
            // user.addAddresses[address.id]
          })
      })
  }
  // // todo какое имя применить в заказе, если ты уже зарегистрирован?
  // Order.create({
  //   promoCode: req.session.authorless.order.promoCode, // todo
  //   comment: req.session.authorless.order.comment, // todo
  //   shipping: req.session.authorless.order.shipping,
  //   status: 'в обработке',
  // })
  //   .then(order => {
  //     const keys = Object.keys(req.session.cart)
  //     ProductQuantity.create({
  //       product_id: req.session.authorless.cart[productID],
  //       qunatity: req.session.authorless.cart[productID].amount,
  //     })
  //
  //     // user.addOrder[order.id],
  //     // mailer.sendOrder(user)
  //     res.json(order)
  //     // redirect('/order' + order.id)
  //   })
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
