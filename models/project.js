const DataTypes = require('sequelize').DataTypes;

module.exports = function(sequelize) {
    var Project = sequelize.define("Project", {
        name: DataTypes.STRING,
    }, {
        modelName: 'project123'
    });

    // class Project extends Sequelize.Model {}
    // Project.init({
    //     name: Sequelize.STRING
    // }, {
    //     sequelize,
    //     modelName: 'project'
    // });

    return Project;
};