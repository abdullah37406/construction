module.exports = (sequelize, Sequelize) => {
    const PersonalInfo = sequelize.define('personalInfo', {
        cnic: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fatherName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        motherName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        otherName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nationality: {
            type: Sequelize.STRING,
            allowNull: false
        },
        relationshipStatus: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: Sequelize.STRING,
            allowNull: false
        },
        alternativePhone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'members',
                key: 'id',
            }
        }
    });
    return PersonalInfo;
}