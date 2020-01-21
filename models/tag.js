const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    var Tag = sequelize.define("Tag", {
        name: DataTypes.STRING,
    }, {
        tableName: 'tag'
    });


    return Tag;
};
// https://sequelize-guides.netlify.com/getting-started/