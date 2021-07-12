module.exports = (sequelize, Sequelize) => {
    const Projects = sequelize.define('projects', {
        projName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        projDescription: {
            type: Sequelize.STRING,
            allowNull: false
        },
        clientName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        clientContact: {
            type: Sequelize.STRING,
            allowNull: false
        },
        projDetail: {
            type: Sequelize.TEXT('long'),
            allowNull: false
        },
        projCategory: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        }
    });
    return Projects;
}