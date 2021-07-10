module.exports = (sequelize, Sequelize) => {
    const MemberCards = sequelize.define('memberCardInfos', {
        memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'members',
                key: 'id',
            }
        },
        cardNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cardStatus: {
            type: Sequelize.ENUM,
            values: ['Delivered', 'NotDelivered'],
            allowNull: false,
        },
        memberStatus: {
            type: Sequelize.ENUM,
            values: ['Active', 'Inactive'],
            allowNull: false,
        },
        type: {
            type: Sequelize.ENUM,
            values: ['Student', 'Employee', 'Member', 'EmployeeMember', 'StudentMember'],
            allowNull: false

        },
        expiryDate: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    });
    return MemberCards;
};