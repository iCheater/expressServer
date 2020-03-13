const express = require('express')
const router = express.Router()
const { Order, User, Address, OrderItem, Product, Mail } = require('../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)
const mailer = require(`${appRoot}/helpers/mailer`)
const { ErrorHandler } = require(`${appRoot}/helpers/error`)

function isAuthorlessValid () {
  console.warn('isAuthorlessValid() IS NOT IMPLEMENTED')
  return true
}

router.get('/neworder', async (req, res, next) => {
  // req.session.authorless = {
  //   username: 'test',
  //   email: 'test@test4.ru',
  //   phone: '89933329293',
  //   address: 'kebab bolshov bulvar 12',
  //   order: {
  //     promoCode: '',
  //     comment: '',
  //     shipping: '',
  //   },
  // }

  try {
    let user = req.session.user || null
    let nonSaltedPassword = null
    if (!req.session.cart) {
      return next(new ErrorHandler(500, 'cart is empty'))
    }

    if (!req.session.user) {
      if (isAuthorlessValid(req.session.authorless)) {
        return next(new ErrorHandler(500, 'user data is not valid'))
      }
      nonSaltedPassword = User.generatePassword()
      user = await User.create({
        username: req.session.authorless.username,
        email: req.session.authorless.email,
        password: nonSaltedPassword,
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

    // todo
    const order = await Order.create({
      promoCode: req.session.authorless.order.promoCode || null,
      comment: req.session.authorless.order.comment || null,
      shipping: req.session.authorless.order.shipping || null,
      status: 'CREATED',
      user_id: user === null ? null : user.id,
    })
    const productIDs = Object.keys(req.session.cart)
    // todo Should i check products in DB or its not my problem?
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

    await OrderItem.bulkCreate(cartItems, { returning: true })

    const orderWithIncludes = await Order.findByPk(order.id, {
      include: {
        model: OrderItem,
        as: 'items',
        include: [{
          model: Product,
        }],
      },
    })

    const mail = await Mail.create({
      type: 'ORDER',
      order_id: orderWithIncludes.id,
      user_id: user.id,
    })

    // no await, because we want to create order, even if mail server is down
    mailer.sendOrder({
      order: orderWithIncludes,
      user: user,
      password: nonSaltedPassword,
      mailId: mail.id,
    })

    // delete req.session.cart

    // auth new user
    if (!req.session.user) {
      req.session.user = user.dataValues
    }
    res.json({
      order: orderWithIncludes,
      user: user,
      password: nonSaltedPassword,
    })

    // redirect('/order' + order.id)
  } catch (err) {
    next(err)
  }
})

// for tests
// router.get('/', (req, res, next) => {
//   Order.findAll({
//     where: {
//       id: 1,
//     },
//     limit: 10,
//     include: [
//       {
//         model: OrderItem,
//         as: 'items',
//         include: [{
//           model: Product,
//         }],
//       },
//       {
//         model: User,
//         as: 'user',
//       }],
//   }).then(orders => {
//     res.json(orders)
//   })
// })

// // for tests
// router.get('/order:id', (req, res, next) => {
//   Order.findByPk(req.params.id, {
//     include: {
//       model: User,
//       include: {
//         model: Address,
//       },
//     },
//   })
//     .then(order => {
//       res.json(order)
//     })
// })
//
// router.get('/list', (req, res, next) => {
//   Order.findAll({
//     include: {
//       model: User,
//       include: {
//         model: Address,
//       },
//     },
//   })
//     .then(order => {
//       res.json(order)
//     })
// })

module.exports = router
