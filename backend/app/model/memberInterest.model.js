module.exports = (sequelize, Sequelize) => {
    const MemberInterest = sequelize.define('memberInterest', {
        memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'members',
                key: 'id',
            }
        },
        interest: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return MemberInterest;
};