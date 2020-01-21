'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//todo why import indexw
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // const model = sequelize['import'](path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { User, Task, Project } = db;

// hasOne vs belongsTo
// User.hasOne(Project); // creates userID in Projects, but nothing in Users
// User.belongsTo(Project);  // creates projectID in User, but nothing in Project

// hasMany vs belongsToMany
Task.hasMany(User, { as: 'workers'}); // Will add taskId to User model and ...getWorkers wtf?
// Task.belongsTo(User,{foreignKey: 'user_id', }); // Will also add userId to Task model



User.create({
  username: 'test',
  email: 'test@mai.ru',
  password: 'test',
});
User.create({
  username: 'admin',
  email: 'admin@admin.ru',
  password: 'admin',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;



//usefull link
// https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize