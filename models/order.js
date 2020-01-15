module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        address: DataTypes.STRING,
        promoCode: DataTypes.STRING,
        comment: DataTypes.STRING,
        shipping: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                Order.hasMany(models.User);
            }
        }
    });

    return Order;
};