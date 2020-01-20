const bcrypt = require('bcrypt');
const Project = require('./project.js');

module.exports = function(sequelize, Sequelize) {

    // var User = sequelize.define("User", {
    //     username: {
    //         type: DataTypes.STRING,
    //         unique: false,
    //         allowNull: true
    //     },
    //     email: {
    //         type: DataTypes.STRING,
    //         unique: true,
    //         allowNull: false
    //     },
    //     password: {
    //         type: DataTypes.STRING,
    //         allowNull: false
    //     }
    // }, {
    //     // classMethods: {
    //     //     associate: function(models) {
    //     //         User.hasMany(models.Task);
    //     //         User.hasMany(models.Order);
    //     //     }
    //     // },
    //     hooks: {
    //         beforeCreate: (user) => {
    //             const salt = bcrypt.genSaltSync();
    //             user.password = bcrypt.hashSync(user.password, salt);
    //         }
    //     },
    //     // instanceMethods: {
    //     //     validPassword: function(password) {
    //     //
    //     //     }
    //     // }
    // });

    class User extends Sequelize.Model {}

    User.init({
        name: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'user'
    });

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // User.associate = function(models) {
    //     models.User.hasMany(models.Task);
    // };

    // User.associate = function(models) {
    //     models.User.hasOne(models.Project)
    // };
    User.hasOne(Project);

    return User;
};

//
// var User = sequelize.define('users', {
//     username: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     hooks: {
//         beforeCreate: (user) => {
//             const salt = bcrypt.genSaltSync();
//             user.password = bcrypt.hashSync(user.password, salt);
//         }
//     },
//     instanceMethods: {
//         validPassword: function(password) {
//             return bcrypt.compareSync(password, this.password);
//         }
//     }
// });
