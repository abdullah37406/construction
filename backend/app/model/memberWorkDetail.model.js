module.exports = (sequelize, Sequelize) => {
    const MemberWork = sequelize.define('memberWorkDetail', {
        memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'members',
                key: 'id',
            }
        },
        qualification: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profession: {
            type: Sequelize.STRING,
            allowNull: false
        },
        designation: {
            type: Sequelize.STRING,
            allowNull: true
        },
        organization: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return MemberWork;
};