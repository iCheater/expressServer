var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Task);
                User.hasMany(models.Order);
            }
        },
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        instanceMethods: {
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });
var test =1;
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
