module.exports = (sequelize, Sequelize) => {
    const MemberInvoice = sequelize.define('memberInvoice', {
        memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'members',
                key: 'id',
            }
        },
        fee: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiryDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            values: ['Dead', 'Active', 'InActive'],
            allowNull: false
        }
    });
    return MemberInvoice;
};