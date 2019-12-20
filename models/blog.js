module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
        name: DataTypes.STRING,
        mURL: DataTypes.STRING,
        description: DataTypes.TEXT
    });

    return Blog;
};