module.exports = (sequelize, Sequelize) => {
    const MemberReferral = sequelize.define('memberReferral', {
        memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'members',
                key: 'id',
            }
        },
        refMemberNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        refName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return MemberReferral;
};