const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
  var Order = sequelize.define('Order', {
    userName: DataTypes.STRING,
    address: DataTypes.STRING,
    promoCode: DataTypes.STRING,
    comment: DataTypes.STRING,
    shipping: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    // classMethods: {
    //     associate: function(models) {
    //         Order.hasMany(models.User);
    //     }
    // }
  })

  return Order
}
