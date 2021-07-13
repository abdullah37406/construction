module.exports = (sequelize, Sequelize) => {
    const ExpertiseDatail = sequelize.define('expertiseDetails', {
        detail: {
            type: Sequelize.TEXT('long'),
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
    return ExpertiseDatail;
}