module.exports = (sequelize, Sequelize) => {
    const Members = sequelize.define('members', {
        membershipNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        personalNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['Member', 'Student', 'Employee', 'StudentMember', 'EmployeeMember'],
            allowNull: false
        },
        typeNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mailingAddress: {
            type: Sequelize.ENUM,
            values: ['Home', 'Business'],
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            values: ['Registration', 'Image', 'Biometric', 'Completed'],
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
    return Members;
}