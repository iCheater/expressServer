'use strict'
// todo refactor https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
// eslint-disable-next-line no-path-concat
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
  Address,
  Order,
  Product,
  Category,
  Tag,
} = db

Product.belongsToMany(Category, { through: 'product_category', foreignKey: 'product_id' })
Category.belongsToMany(Product, { through: 'product_category', foreignKey: 'category_id' })

Product.belongsToMany(Tag, { through: 'product_tag', foreignKey: 'product_id' })
Tag.belongsToMany(Product, { through: 'product_tag', foreignKey: 'tag_id' })

User.hasMany(Address, { as: 'addresses', foreignKey: 'user_id' })
Address.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Order, { as: 'orders', foreignKey: 'user_id' })
Order.belongsTo(User, { foreignKey: 'user_id' })

Order.belongsToMany(Product, { through: 'order_product', foreignKey: 'order_id' })
Product.belongsToMany(Order, { through: 'order_product', foreignKey: 'product_id' })

// example of nested association:
// Project.hasMany(Tag);
// Project.User = Project.belongsTo(User, { as: 'user' })
// User.Addresses = User.hasMany(Address, { as: 'addresses' })

process.argv.forEach((val, index, array) => {
  if (val === 'sync') {
    console.log('sync')
    sequelize.sync({
      force: true, // This creates the table, dropping it first if it already existed
      // alter: true // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
    }).then(() => {
      sequelize.close()
    })
    console.log('sync complete')
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
// usefull link
// https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
