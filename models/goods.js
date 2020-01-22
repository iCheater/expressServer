module.exports = function(sequelize, DataTypes) {
    var Good = sequelize.define("Good", {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        mURL: DataTypes.STRING,
        description: DataTypes.TEXT,
        // category: DataTypes.STRING
    }, {
        // classMethods: {
        //     associate: function(models) {
        //         Good.belongsToMany(models.Category, { through: 'goodCategory' })
        //     }
        // }
    });
    // Good.associate = function(models) {
    //     models.Good.belongsToMany(models.Category, {
    //         through: 'goodCategory',
    //         foreignKey: 'goodId',
    //         as: 'goods'
    //     })
    // };

    return Good;
};