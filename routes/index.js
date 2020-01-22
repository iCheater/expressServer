'use strict';
const indexRouter = require('./home');
const usersRouter = require('./users');
const itemsRouter = require('./items');
const catalogRouter = require('./catalog');
const blogRouter = require('./blog');
const goodsRouter = require('./goods');
const signupRouter = require('./signup');
const loginRouter = require('./login');
const adminRouter = require('./admin');
const taskRouter = require('./tasks');

const categoriesRouter = require('./categories');
const testRouter = require('./test');
// const orderRouter = require('./orders');
// const profileRouter = require('./profile');

const express = require('express');
const router = express.Router();

router.use('/', indexRouter);

router.use('/users/', usersRouter);
router.use('/items/', itemsRouter);
router.use('/catalog/', catalogRouter);
router.use('/blog/', blogRouter);
router.use('/goods/', goodsRouter);
// router.use('/profile/', profileRouter);
router.use('/orders/', indexRouter);

//auth
router.use('/signup/', signupRouter);
router.use('/login/', loginRouter);
// //admin
router.use('/admin/', adminRouter);
router.use('/admin/goods/', goodsRouter);
router.use('/admin/tasks/', taskRouter);
router.use('/admin/categories/', categoriesRouter);
// //
router.use('/test', testRouter);

module.exports = router;