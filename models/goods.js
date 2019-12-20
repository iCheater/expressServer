module.exports = function(sequelize, DataTypes) {
    var Good = sequelize.define("Good", {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        mURL: DataTypes.STRING,
        description: DataTypes.TEXT,
        category: DataTypes.STRING
    }, {
        // classMethods: {
        //     associate: function(models) {
        //         User.hasMany(models.Task)
        //     }
        // }
    });

    return Good;
};