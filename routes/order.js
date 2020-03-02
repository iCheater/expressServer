const express = require('express')
const router = express.Router()
const { Order, User, Address, OrderItem, Product } = require('../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/config/winstonLogger`)
const mailer = require(`${appRoot}/helpers/mailer`)

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
function isAuthorlessValid () {
  console.warn('isAuthorlessValid() IS NOT IMPLEMENTED')
  return true
}

router.get('/neworder', async (req, res, next) => {
  // ситуэйшны:
  // - Я зареган, сделал заказ, но забыл авторизоваться, предлагаем авторизоваться на этапе оформления
  // - Я зареган, сделал заказ указав другого получателя
  req.session.authorless = {
    username: 'artem',
    email: 'test@test2.ru',
    phone: '89933329293',
    address: 'moscow bolshov bulvar 12',
    order: {
      promoCode: '',
      comment: '',
      shipping: '',
    },
  }
  let user = req.session.user || null
  try {
    if (!req.session.cart) {
      return res.json({ message: 'ошибка, у вас пустая корзина' })
    }

    if (!req.session.user) {
      if (!isAuthorlessValid(req.session.authorless)) {
        return res.json({ message: 'данные пользователя не валидны' })
      }
      // const user = await User.findOne({ where: { email: req.session.authorless.email } })
      //   .then(user => {
      //     if (user) {
      //       return res.json({ message: 'пользователь с таким email уже существует' })
      //     }
      //   })
      //
      const tempPassword = User.generatePassword()
      user = await User.create({
        username: req.session.authorless.username,
        email: req.session.authorless.email,
        password: tempPassword,
        phone: req.session.authorless.phone,
        addresses: [{
          textAddress: req.session.authorless.address,
        }],
      }, {
        include: {
          model: Address,
          as: 'addresses',
        },
      })
    }

    const order = await Order.create({
      promoCode: req.session.authorless.order.promoCode || null,
      comment: req.session.authorless.order.comment || null,
      shipping: req.session.authorless.order.shipping || null,
      status: 'CREATED',
      user_id: user === null ? null : user.id,
    })
    const productIDs = Object.keys(req.session.cart)
    // todo Should i check products in DB ?
    const cartItems = []
    for (const productID of productIDs) {
      const cartItem = {
        quantity: req.session.cart[productID].quantity,
        subTotal: req.session.cart[productID].subTotal,
        product_id: productID,
        order_id: order.id,
      }
      cartItems.push(cartItem)
    }
    console.log(cartItems[0])
    const orderItems = await OrderItem.bulkCreate(cartItems, { returning: true })

    // todo password, orderItems+include products
    // todo create model mail.
    mailer.sendOrder({
      username: user.username,
      email: user.email,
      order: order.id,
      orderItems: orderItems,
    })

    delete req.session.cart
    // todo auth new user

    res.json({
      order: order,
      orderItems: orderItems,
    })

    // redirect('/order' + order.id)
  } catch (e) {
    console.log(e)
    // res.json({
    //   errors: e.errors,
    // })
    res.json(e)
  }
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
