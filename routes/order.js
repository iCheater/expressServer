const express = require('express')
const router = express.Router()
const { Order, User, Address, OrderItem, Product, Mail, Promocode } = require('../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)
const mailer = require(`${appRoot}/helpers/mailer`)
const { ErrorHandler } = require(`${appRoot}/helpers/error`)

function isAuthorlessValid () {
  console.warn('isAuthorlessValid() IS NOT IMPLEMENTED')
  return true
}

router.get('/', async (req, res, next) => {
  // получаю массив id для запроса на сервер
  const arrOrder = []
  if (!req.session.cart && !req.session.order) {
    res.redirect('/')
  }

  for (let id in req.session.cart.items) {
    if (req.session.cart.items[id].checked) {
      arrOrder.push(id)
    }
  }
  // console.log(arrOrder)

  //запрос на сервер
  try {
    const products = await Product.findAll({ where: { id: arrOrder } })
    let promocode = null
    if (req.session.order && req.session.order.promocode) {
      promocode = await Promocode.findOne({
        where: {
          name: req.session.order.promocode,
        },
      })
    }
    // console.log('products', products)
    // console.log('req.session.cart.items', req.session.cart.items)

    const rowProducts = products.map(product => product.get({ row: true }))

    rowProducts.forEach(product => {
      product.quantity = req.session.cart.items[product.id].quantity
    })
    // console.log('rowProducts', rowProducts)
    res.render('order/order', {
      products: rowProducts,
      templateData: req.session.cart.calculation,
      //todo think about
      sumShipping: 40000,
      promocode: promocode,
      address: req.session.order.address,
      wayShipping: req.session.order.wayShipping,
      methodPay: req.session.order.methodPay,
    })
  } catch (err) {
    next(err)
  }
})

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

    const order = await Order.create({
      promoCode: req.session.authorless.order.promoCode || null,
      comment: req.session.authorless.order.comment || null,
      shipping: req.session.authorless.order.shipping || null,
      status: 'CREATED',
      user_id: user === null ? null : user.id,
    })
    const productIDs = Object.keys(req.session.cart)
    // Should i check products in DB or its not my problem?
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

router.post('/promocode/', async (req, res, next) => {
  console.log('promocode', req.body.promocode)
  // req.body.promocode = 'testDataStart'
  try {
    let promocode = await Promocode.findOne({
      where: {
        name: req.body.promocode,
      },
    })

    if (promocode === null) {
      console.log('promocodes is NULL')
      return res.json({
        status: 'error',
        msg: 'promocode is not exist',
      })
    }

    if ((new Date() > promocode.finishAt) || (promocode.counter > promocode.counterLimit)) {
      promocode.status = 'INACTIVE'
      promocode.save()
    }

    if (promocode.status === 'INACTIVE') {
      return res.json({
        status: 'error',
        msg: 'promocode is INACTIVE',
      })
    }
    // console.log('promocode is ACTIVE')

    if (new Date() <= promocode.startAt || new Date() >= promocode.finishAt) {
      return res.json({
        status: 'error',
        msg: 'promocode invalid time range',
      })
    }
    // console.log('promocode is in valid time range')

    if (promocode.counter >= promocode.counterLimit) {
      return res.json({
        status: 'error',
        msg: 'reached activation limit',
      })
    }
    // console.log('promocode activation limit is ok')

    if (!req.session.order) {
      req.session.order = {}
    }
    req.session.order.promocode = promocode.name

    return res.json({
      status: 'ok',
      msg: 'promocode is ok',
      promocode: {
        name: promocode.name,
        discountPercent: promocode.discountPercent,
        discountCurrency: promocode.discountCurrency,
      },
    })

  } catch (e) {
    next(e)
  }

  // если промокод найден - отправляешь ОК и меняешь цвет инпута на зеленый,
  // если нет, то на красный, мол не найден
})

router.post('/address/', (req, res) => {
  const address = req.body.address
  console.log('address', address)
  if (!req.session.order) {
    req.session.order = {}
  }
  req.session.order.address = address
  return res.json({
    status: 'ok',
    msg: 'address is ok',
    address: address,
  })
})

router.post('/wayShipping/', (req, res) => {
  const wayShipping = req.body.wayShipping
  console.log('wayShipping', wayShipping)
  if (!req.session.order) {
    req.session.order = {}
  }
  req.session.order.wayShipping = wayShipping
  return res.json({
    status: 'ok',
    msg: 'wayShipping is ok',
    wayShipping: wayShipping,
  })

})

router.post('/methodPay/', (req, res) => {
  const methodPay = req.body.methodPay
  console.log('methodPay', methodPay)
  if (!req.session.order) {
    req.session.order = {}
  }
  req.session.order.methodPay = methodPay
  return res.json({
    status: 'ok',
    msg: 'methodPay is ok',
    methodPay: methodPay,
  })

})

module.exports = router
