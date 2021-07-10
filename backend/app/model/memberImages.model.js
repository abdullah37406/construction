module.exports = (sequelize, Sequelize) => {
    const MemberImages = sequelize.define('memberImages', {
        memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'members',
                key: 'id',
            }
        },
        imgPath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: Sequelize.ENUM,
            values: ['QR', 'Profile', 'RightThumb', 'LeftThumb', 'RightFinger', 'LeftFinger', 'CNIC', 'BFrom'],
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
    return MemberImages;
};