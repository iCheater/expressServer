const DataTypes = require('sequelize').DataTypes;

module.exports = function(sequelize) {
    var Address = sequelize.define("Address", {
        type: DataTypes.STRING,
        line1: DataTypes.STRING,
        line2: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
    }, {
        //
    });


    return Address;
};