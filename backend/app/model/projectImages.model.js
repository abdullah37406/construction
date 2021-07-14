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
            values: ['Icon', 'Carousel','Aboutus','Services','History','Approach'],
            allowNull: true

        }, 
        aboutUsId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'aboutUs',
                key: 'id',
            }
        },
        expertyId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'expertises',
                key: 'id',
            }
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
       
    });
    return ProjectImages;
};