module.exports = function(sequelize, Sequelize) {
    // var Project = sequelize.define("Project", {
    //     name: DataTypes.STRING,
    // }, {
    //     modelName: 'project123'
    // });

    class Project extends Sequelize.Model {}
    Project.init({
        name: Sequelize.STRING
    }, {
        sequelize,
        modelName: 'project'
    });

    return Project;
};