module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Сategory", {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
    }, {
        // classMethods: {
        //     associate: function(models) {
        //
        //         Category.belongsToMany(models.Good, { through: 'goodCategory' })
        //     }
        // }
    });

    // Category.associate = function(models) {
    //     models.Category.belongsToMany(models.Good, {
    //         through: 'goodCategory',
    //         foreignKey: 'categoryId',
    //         as: 'days'
    //     })
    // };

    return Category;
};
// https://sequelize-guides.netlify.com/getting-started/