'use strict';
const indexRouter = require('./home');
// const usersRouter = require('./users');
// const itemsRouter = require('./items');
// const catalogRouter = require('./catalog');
// const blogRouter = require('./blog');
// const goodsRouter = require('./goods');
// const signupRouter = require('./signup');
// const loginRouter = require('./login');
// const adminRouter = require('./admin');
// const taskRouter = require('./tasks');
// const profileRouter = require('./profile');
// const categoriesRouter = require('./categories');
// const testRouter = require('./test');
// const orderRouter = require('./orders');

//
// const fs = require('fs');
// const path = require('path');
// const basename = path.basename(__filename);
const express = require('express');
const router = express.Router();

// const routes = {};
// fs.readdirSync(__dirname)
//     .filter(file => {
//         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(file => {
//         // const model = sequelize['import'](path.join(__dirname, file));
//         const router = require(path.join(__dirname, file));
//         routes[router.name] = router;
//
//     });




router.use('/', indexRouter);

// app.use('/users/', usersRouter);
// app.use('/items/', itemsRouter);
// app.use('/catalog/', catalogRouter);
// app.use('/blog/', blogRouter);
// app.use('/goods/', goodsRouter);
// app.use('/profile/', profileRouter);
// router.use('/orders/', indexRouter);

//auth
// app.use('/signup/', signupRouter);
// app.use('/login/', loginRouter);
// //admin
// app.use('/admin/', adminRouter);
// app.use('/admin/goods/', goodsRouter);
// app.use('/admin/tasks/', taskRouter);
// app.use('/admin/categories/', categoriesRouter);
// //
// app.use('/test', testRouter);

module.exports = router;