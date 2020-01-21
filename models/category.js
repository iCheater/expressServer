const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    var Category = sequelize.define("Category", {
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
    Category.associate = function(models) {
        models.Category.belongsToMany(models.Good, {
            through: 'goodCategory',
            foreignKey: 'categoryId',
            as: 'categories'
        })
    };

    return Category;
};
// https://sequelize-guides.netlify.com/getting-started/