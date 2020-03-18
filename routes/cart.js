const express = require('express')
const router = express.Router()
const { Product, User, Order, Bonus } = require('./../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)

router.get('/', async (req, res, next) => {
  console.log(req.session.cart)
  logger.verbose('/cart')

  if (!req.session.cart) {
    logger.verbose('req.session.cart is empty!')
    return res.render('cart/cart', {
      session: req.session,
    })
  }
  const arrCartID = Object.keys(req.session.cart.items)

  try {
    const bonuses = await Bonus.findAll({
      where: {
        status: 'ACTIVE',
      },
    })

    const products = await Product.findAll({ where: { id: arrCartID } })
    const templateData = {
      bonuses,
    }

    if (products.length > 0) {
      const rowProducts = products.map(product => product.get({ row: true }))
      templateData.sumRowTotal = 0
      templateData.sumDiscountInMoney = 0
      templateData.sumSellingPriceWithDiscount = 0
      templateData.selectAllStatus = true
      templateData.productsOutOFStock = []
      templateData.productsWithAmount = []

      rowProducts.forEach(product => {
        if (product.stock > 0) {
          product.quantity = req.session.cart.items[product.id].quantity
          product.checked = req.session.cart.items[product.id].checked
          product.rowTotal = product.sellingPrice * product.quantity
          product.sellingPriceWithDiscount = product.rowTotal * (100 - product.discountRate) / 100
          product.discountInMoney = product.rowTotal - product.sellingPriceWithDiscount
          templateData.productsWithAmount.push(product)

          templateData.sumRowTotal = templateData.sumRowTotal + product.rowTotal
          templateData.sumDiscountInMoney = templateData.sumDiscountInMoney + product.discountInMoney
          templateData.sumSellingPriceWithDiscount = templateData.sumSellingPriceWithDiscount + product.sellingPriceWithDiscount

          if (!product.checked) {
            templateData.selectAllStatus = false
          }
        } else {
          templateData.productsOutOFStock.push(product)
        }
      })
    }
    // todo IS IT BAD TO DO IT HERE?
    let lastBonusStart = null
    bonuses.forEach(bonus => {
      if (templateData.sumSellingPriceWithDiscount >= bonus.bonusStart) {
        bonus.class = 'done'
      } else if (templateData.sumSellingPriceWithDiscount < bonus.bonusStart && templateData.sumSellingPriceWithDiscount > lastBonusStart) {
        bonus.class = 'active'
      }
      lastBonusStart = bonus.bonusStart
    })
    console.log(templateData)
    res.render('cart/cart', templateData)
  } catch (err) {
    next(err)
  }
})

// Order.create(formData, {
//   include: [{ model: Product }],
// })
//   .then(cart => {
//     console.log(cart)
//     cart.setProducts([55, 62]).then(products => {
//       res.json(products)
//     })
//   })

// router.put('/:productID', (req, res, next) => {
//   console.log(req.params)
//   console.log(req.body)
//   const productID = req.params.productID
//   console.log('productID', productID)
//
//   if (!req.session.cart) {
//     req.session.cart = {}
//   }
//
//   if (req.session.cart[productID]) {
//     req.session.cart[productID].quantity++
//   } else {
//     req.session.cart[productID] = {}
//     req.session.cart[productID].quantity = 1
//     req.session.cart[productID].checked = true
//   }
//   const data = {
//     cartLength: Object.keys(req.session.cart).length,
//   }
//   res.locals.cartLength = Object.keys(req.session.cart).length
//   console.log(res.locals)
//   // req.session.cart.cartLength = Object.keys(req.session.cart).length
//
//   console.log('data', data)
//   res.json(data)
//   // console.log(req.session)
// })

router.delete('/:productID', (req, res) => {
  console.log('before req.session.cart', req.session.cart)
  delete req.session.cart.items[req.params.productID]
  req.session.cart.cartLength = calCartQuantity(req)
  console.log('after req.session.cart', req.session.cart)
  res.status(200).json({ cart: req.session.cart })
})

router.post('/select', (req, res, next) => {
  console.log('req.body', req.body)
  console.log('req.session.cart before', req.session.cart)
  for (const key in req.body) {
    req.session.cart.items[key].checked = req.body[key]
  }
  console.log('req.session.cart after', req.session.cart)
  res.json({ mgs: req.session.cart })
})

router.post('/quantity', (req, res, next) => {
  console.log('req.body', req.body)
  console.log('req.session.cart before', req.session.cart)

  if (!req.session.cart) {
    req.session.cart = {
      items: {},
    }
  }
  for (const productId in req.body) {
    if (req.body[productId] === 0) {
      delete req.session.cart.items[productId]
    } else {
      if (!req.session.cart.items[productId]) {
        req.session.cart.items[productId] = {}
        req.session.cart.items[productId].checked = true
      }
      req.session.cart.items[productId].quantity = req.body[productId]
    }
  }
  req.session.cart.cartLength = calCartQuantity(req)
  console.log('req.session.cart after', req.session.cart)
  res.json({ cart: req.session.cart })
})

router.post('/order', (req, res, next) => {
  console.log('order req.session', req.session)
  console.log('req.body address', req.body)

  if (!req.session.authorless) {
    req.session.authorless = {}
  }

  if (req.body.address) {
    req.session.authorless.address = req.body.address
    // megick return autocomplete
    res.json({ address: req.session.authorless.address })
  }
  if (req.body.name) {
    req.session.authorless.name = req.body.name
    res.json({ msg: 'ok' })
  }

  if (req.body.phone) {
    req.session.authorless.phone = req.body.phone
    res.json({ msg: 'ok' })
  }
  console.log('order req.session', req.session)
})

function calCartQuantity (req) {
  let cartLength = 0
  for (const productID in req.session.cart.items) {
    cartLength = cartLength + req.session.cart.items[productID].quantity
  }
  return cartLength
}

module.exports = router
