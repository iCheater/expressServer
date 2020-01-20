'use strict';
module.exports = (sequelize, DataTypes) => {
    var Task = sequelize.define('Task', {
        title: DataTypes.STRING
    });

    Task.associate = function (models) {
        models.Task.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    // ////
    // class Task extends sequelize.Model {
    //     static associate(models){
    //
    //     }
    // }
    //
    // ///
    // Task.init({
    //     title: DataTypes.STRING
    // }, {
    //     sequelize,
    //     modelName: 'task'
    // });


    return Task;
};