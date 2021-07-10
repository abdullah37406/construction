module.exports = (sequelize, Sequelize) => {
    const ProjectImages = sequelize.define('projectImages', {
        projectId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'id',
            }
        },
        imgPath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['Icon', 'Carousel'],
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
    return ProjectImages;
};