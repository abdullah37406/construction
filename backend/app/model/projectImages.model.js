module.exports = (sequelize, Sequelize) => {
    const ProjectImages = sequelize.define('projectImages', {
        projectId: {
            type: Sequelize.INTEGER,
            allowNull: true,
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
            values: ['Icon', 'Carousel','Aboutus','Services','History','Approch'],
            allowNull: false

        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        aboutUsId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'aboutUs',
                key: 'id',
            }
        },
    });
    return ProjectImages;
};