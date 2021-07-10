module.exports = (sequelize, Sequelize) => {
    const MemberAddress = sequelize.define('memberAddress', {
        houseNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        streetNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        area: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        town: {
            type: Sequelize.STRING,
            allowNull: false
        },
        district: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: true
        },
        country: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: Sequelize.ENUM,
            values: ['Home', 'Business'],
            allowNull: false

        },
        isDeleted: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '0'
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
    return MemberAddress;
}