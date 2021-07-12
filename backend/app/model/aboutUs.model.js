module.exports = (sequelize, Sequelize) => {
    const AboutUs = sequelize.define('aboutUs', {
        detail: {
            type: Sequelize.TEXT('long'),
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['Aboutus','Services','History','Approach'],
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
    return AboutUs;
}