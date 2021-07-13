module.exports = (sequelize, Sequelize) => {
    const Expertise = sequelize.define('expertises', {
        type: {
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
    return Expertise;
}