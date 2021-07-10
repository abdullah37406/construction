module.exports = (sequelize, Sequelize) => {
    const MemberCardDelivery = sequelize.define('memberCardDelivery', {
        cardId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'memberCardInfos',
                key: 'id',
            }
        },
        deliveryDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deliveryTime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deliveryTo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        deliveryToContact: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return MemberCardDelivery;
};