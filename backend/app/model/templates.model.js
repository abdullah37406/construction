module.exports = (sequelize, Sequelize) => {
    const Template = sequelize.define('template', {
        imgPath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['Staff-Front','Staff-Back','Student-Front','Student-Back','Employee-Front','Employee-Back'],
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
    return Template;
};