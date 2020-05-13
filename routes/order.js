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

  if (!req.session.cart) {
    return res.redirect('/')
  }

  if(!req.session.order) {
    req.session.order = {}
  }

  for (let id in req.session.cart.items) {
    if (req.session.cart.items[id].checked) {
      arrOrder.push(id)
    }
  }
  console.log(req.session.order)

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

    const rowProducts = products.map(product => product.get({ row: true }))

    rowProducts.forEach(product => {
      product.quantity = req.session.cart.items[product.id].quantity
    })
    console.log('req.session.order', req.session.order)

    res.render('order/order', {
      products: rowProducts,
      templateData: req.session.cart.calculation,
      //todo think about
      sumShipping: 40000,
      // promocode: promocode,
      address: req.session.order.address || '',
      wayShipping: req.session.order.wayShipping || '',
      methodPay: req.session.order.methodPay || '',
      newUser: req.session.order.newUser || {},
      newRecipient: req.session.order.newRecipient || {},
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

    if (new Date() <= promocode.startAt || new Date() >= promocode.finishAt) {
      return res.json({
        status: 'error',
        msg: 'promocode invalid time range',
      })
    }

    if (promocode.counter >= promocode.counterLimit) {
      return res.json({
        status: 'error',
        msg: 'reached activation limit',
      })
    }

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

router.post('/newUser/', (req, res) => {
  console.log('newUser', req.body.newUser)
  if (!req.session.order) {
    req.session.order = {}
  }

  req.session.order.newUser = {
    name: {
      firstname: req.body.newUser.name,
      status: 'ok',
    },
    lastname: {
      lastname: req.body.newUser.lastname,
      status: 'ok',
    },
    phone: {
      number: req.body.newUser.phone,
      status: 'ok',
    },
    mail: {
      mail: req.body.newUser.mail,
      status: 'ok',
    },
  }

  const regName = /^[a-zа-яё]+(?: [a-zа-яё]+)?$/i
  console.log('xc', regName.test(req.body.newUser.name))
  if(regName.test(req.body.newUser.name) === false) {
    req.session.order.newUser.name.status = 'error'
    console.log('name error')
  }

  if(regName.test(req.body.newUser.lastname) === false) {
    req.session.order.newUser.lastname.status = 'error'
    console.log('name error')
  }

  const regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/

  if(regPhone.test(req.body.newUser.phone) === false) {
    req.session.order.newUser.phone.status = 'error'
    console.log('phone error')
  }

  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if(reg.test(req.body.newUser.mail) === false) {
    req.session.order.newUser.mail.status = 'error'
    console.log('Введите корректный e-mail')
  }
  return res.json(req.session.order.newUser)
})

router.post('/newRecipient/', (req, res) => {
  console.log('newRecipient', req.body.newRecipient)
  if (!req.session.order) {
    req.session.order = {}
  }

  req.session.order.newRecipient = {
    name: {
      firstname: req.body.newRecipient.name,
      status: 'ok',
    },
    lastname: {
      lastname: req.body.newRecipient.lastname,
      status: 'ok',
    },
    phone: {
      number: req.body.newRecipient.phone,
      status: 'ok',
    },
  }

  const regName = /^[a-zа-яё]+(?:[a-zа-яё]+)?$/i
  if(regName.test(req.body.newRecipient.name) === false) {
    req.session.order.newRecipient.name.status = 'error'
    console.log('name error')
  }

  if(regName.test(req.body.newRecipient.lastname) === false) {
    req.session.order.newRecipient.lastname.status = 'error'
    console.log('last name error')
  }

  const regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/
  if(regPhone.test(req.body.newRecipient.phone) === false) {
    req.session.order.newRecipient.phone.status = 'error'
    console.log('phone error')
  }

  return res.json(req.session.order.newRecipient)
})

router.get('/createOrder/', async (req, res, next) => {
  console.log(req.session.cart)
  let totalOrder = req.session.cart.calculation.sumSellingPriceWithDiscount
  let totalShipping = 0

  if(req.session.order.wayShipping === 'expressDelivery'){
    totalShipping = 400
    totalOrder = totalShipping + totalOrder
    console.log('курьер за 400')

  }
  req.session.order.totalOrder = totalOrder

  // res.render('order/createOrder', {
  //   totalOrder: totalOrder
  // })

  const arrOrder = []
  for (let id in req.session.cart.items) {
    if (req.session.cart.items[id].checked) {
      arrOrder.push(id)
    }
  }
  const products = await Product.findAll({ where: { id: arrOrder } })
  const rowProducts = products.map(product => product.get({ row: true }))

  rowProducts.forEach(product => {
    product.quantity = req.session.cart.items[product.id].quantity
  })
  console.log('req.session.order', req.session.order)


  req.session.authorless = {
    username: req.session.order.newUser.name.firstname + ' ' + req.session.order.newUser.lastname.lastname,
    email: req.session.order.newUser.mail.mail,
    phone: req.session.order.newUser.phone.number,

    order: {
      address: req.session.order.address,
      shipping: req.session.order.wayShipping,
      methodPay: req.session.order.methodPay,
      // products: req.session.cart.items,
      products: rowProducts,
    },
  }
  res.render('order/createOrder', req.session.authorless)
  console.log('req.session.authorless', req.session.authorless.order.products)
  //
  // try {
  //   let user = req.session.user || null
  //   let nonSaltedPassword = null
  //   if (!req.session.cart) {
  //     return next(new ErrorHandler(500, 'cart is empty'))
  //   }
  //
  //   if (!req.session.user) {
  //     // if (isAuthorlessValid(req.session.authorless)) {
  //     //   return next(new ErrorHandler(500, 'user data is not valid'))
  //     // }
  //     nonSaltedPassword = User.generatePassword()
  //     user = await User.create({
  //       username: req.session.authorless.username,
  //       email: req.session.authorless.email,
  //       password: nonSaltedPassword,
  //       phone: req.session.authorless.phone,
  //       addresses: [{
  //         textAddress: req.session.authorless.address,
  //       }],
  //     }, {
  //       include: {
  //         model: Address,
  //         as: 'addresses',
  //       },
  //     })
  //   }
  //
  //   const order = await Order.create({
  //     comment: req.session.authorless.order.comment || null,
  //     shipping: req.session.authorless.order.shipping || null,
  //     status: 'CREATED',
  //     // user_id: user === null ? null : user.id,
  //     user_id: user.id,
  //   })
  //   const productIDs = Object.keys(req.session.cart)
  //   // Should i check products in DB or its not my problem?
  //   const cartItems = []
  //   for (const productID of productIDs) {
  //     const cartItem = {
  //       quantity: req.session.cart[productID].quantity,
  //       subTotal: req.session.cart[productID].subTotal,
  //       product_id: productID,
  //       order_id: order.id,
  //     }
  //     cartItems.push(cartItem)
  //   }
  //
  //   await OrderItem.bulkCreate(cartItems, { returning: true })
  //
  //   const orderWithIncludes = await Order.findByPk(order.id, {
  //     include: {
  //       model: OrderItem,
  //       as: 'items',
  //       include: [{
  //         model: Product,
  //       }],
  //     },
  //   })
  //
  //   const mail = await Mail.create({
  //     type: 'ORDER',
  //     order_id: orderWithIncludes.id,
  //     user_id: user.id,
  //   })
  //
  //   // no await, because we want to create order, even if mail server is down
  //   mailer.sendOrder({
  //     order: orderWithIncludes,
  //     user: user,
  //     password: nonSaltedPassword,
  //     mailId: mail.id,
  //   })
  //
  //   // delete req.session.cart
  //
  //   // auth new user
  //   if (!req.session.user) {
  //     req.session.user = user.dataValues
  //   }
  //   res.render('order/createOrder', {
  //     order: orderWithIncludes,
  //     user: user,
  //     password: nonSaltedPassword,
  //   })
  //
  // } catch (err) {
  //   next(err)
  // }

})

module.exports = router
