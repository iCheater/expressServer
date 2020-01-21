const bcrypt = require('bcrypt');
const { DataTypes }  = require('sequelize');

module.exports = (sequelize) => {

    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            // unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            // unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // hooks: {
        //     beforeCreate: (user) => {
        //         const salt = bcrypt.genSaltSync();
        //         user.password = bcrypt.hashSync(user.password, salt);
        //     }
        // },
        // instanceMethods: {
        //     validPassword: function(password) {
        //         return bcrypt.compareSync(password, this.password);
        //     }
        // }
    });

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // User.associate = function(models) {
    //     models.User.hasMany(models.Task);
    // };

    User.create({
        username: 'admin',
        email: 'admin@admin.ru',
        password: 'password'
    })
        .then(user => {
            console.log(user.get());
        });

    return User;
};
