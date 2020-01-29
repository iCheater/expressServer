'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname)
  .filter(file => {
    // todo does index.js imports too?
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    // const model = sequelize['import'](path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

const {
  User,
  Task,
  Project,
  Address,
  Tag,
  Order,
  Product,
  Category
} = db

// hasOne vs belongsTo
// User.hasOne(Project); // creates userID in Projects, but nothing in Users
// User.belongsTo(Project);  // creates projectID in User, but nothing in Project

// hasMany vs belongsToMany
// Task.hasMany(User, { as: 'workers'}); // Will add taskId to User model and  task.getWorkers

// Belongs-To-Many
// Project.belongsToMany(User, {through: 'UserProject'});
// User.belongsToMany(Project, {through: 'UserProject'});
// User.hasMany(Address);
Product.belongsToMany(Category, { through: 'productCategory', foreignKey: 'productId' })
Category.belongsToMany(Product, { through: 'productCategory' })

// Product.categories = Category.belongsToMany(Product, { through: 'productCategory' })
// Product.categories = Category.belongsToMany(Product, { through: 'productCategory', as: 'categories' })

User.hasMany(Tag, { as: 'tags' })
User.hasMany(Order, { as: 'orders' })

User.hasMany(Address, { as: 'addresses', foreignKey: 'user_id' })
Address.belongsTo(User, { })
// Project.hasMany(Tag);
Project.User = Project.belongsTo(User, { as: 'user' })
// User.Addresses = User.hasMany(Address, { as: 'addresses' })

sequelize.sync({
  force: true, // This creates the table, dropping it first if it already existed
  // alter: true // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

// usefull link
// https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
