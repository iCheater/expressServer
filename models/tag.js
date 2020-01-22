const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    var Tag = sequelize.define("Tag", {
        name: DataTypes.STRING,
    }, {
        // tableName: 'Tag' // in base
    });


    return Tag;
};
// https://sequelize-guides.netlify.com/getting-started/