const express = require('express')
const router = express.Router()
const { Order } = require('../../models')
//
router.get('/', (req, res) => {
  // User.findAll({
  //     include: [ Task ]
  // }).then(function(users) {
  //     res.render('task', {
  //         title: 'Sequelize: Express Example',
  //         users: users
  //     });
  // });

  const pagination = [1, 2, 3, 4, '...', 99]
  Order.findAll({
    limit: 15,
    where: {
      // UserId: 1
    },
  }).then((data) => {
    const tableData = data.map(e => e.get({ row: true }))
    console.table(tableData)
    // res.json(tableData)
    res.render('admin/orders', {
      orders: tableData,
      pagination: pagination,
    })
  })
})
router.get('/page/:page', (req, res) => {
  const elemsPerPage = 10

  Order.findAndCountAll({
    // where: {},
    // order: [],
    limit: elemsPerPage,
    offset: elemsPerPage * (req.params.page - 1),
  }).then((data) => {
    const pagination = []
    const totalPages = data.count / elemsPerPage

    for (let i = 1; i < 4; i++) {
      // console.log('i', i)
      pagination.push({
        num: i,
        active: (parseInt(req.params.page) === i),
      })
    }
    pagination.push({
      num: '...',
    }, {
      num: totalPages,
    })
    pagination.unshift({
      num: '<<',
    })
    pagination.push({
      num: '>>',
    })

    console.log(pagination)
    // console.log()

    res.render('admin/orders', {
      orders: data.rows,
      totalPages: totalPages,
      activePage: req.params.page,
      elemsPerPage: elemsPerPage,
      pagination: pagination,
    })
  })
})

router.get('/add', (req, res) => {
  console.log('Got body:', req.body)
  // console.log('Got body:', req);

  Order.create({
    address: 'address',
    promoCode: 'promocode 999',
    comment: 'commentsss11',
    shipping: 'shipping mtheoids',
    name: 'name of wtf',
    email: 'mail@mail.ru',
    phone: 'phone',
    UserId: 1,
  })
    .then((good) => {
      // res.json(good);
      // var msg = {
      //     message: 'form data loaded',
      //     status: 'ok',
      //     data: good
      // };
      res.json(good)
    })
})

module.exports = router
