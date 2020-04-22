const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
  const Order = sequelize.define('Order', {
    // userName: DataTypes.STRING,
    // address: DataTypes.STRING,
    promoCode: DataTypes.STRING,
    comment: DataTypes.STRING,
    // shipping: DataTypes.STRING,
    // email: DataTypes.STRING,
    // phone: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
      defaultValue: 'CREATED',
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
    },
    shipping: {
      type: DataTypes.ENUM('Самовывоз', 'Курьерская доставка'),
      defaultValue: 'Самовывоз',
    },

    // items: {
    //   // structure: {product: {Product}, quantity: X, price: X}
    //   type: DataTypes.ARRAY(Sequelize.JSON),
    //   allowNull: false
    // },
    // subTotal: {
    //   type: DataTypes.VIRTUAL,
    //   get: function() {
    //     if (this.items && this.items.length)
    //       return this.items.map(item => item.quantity * item.price).reduce((a,b) => a + b, 0)
    //     else {
    //       return 0
    //     }
    //   }
    // },
  }, { })

  return Order
}
