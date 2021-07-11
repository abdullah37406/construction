const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.member = require('../model/members.model.js')(sequelize, Sequelize);
db.memberAddress = require('../model/memberAddress.model.js')(sequelize, Sequelize);
db.memberCardInfo = require('../model/memberCardInfo.model.js')(sequelize, Sequelize);
db.memberCardDelivery = require('../model/memberCardDelivery.model.js')(sequelize, Sequelize);
db.memberImages = require('../model/memberImages.model.js')(sequelize, Sequelize);
db.template = require('../model/templates.model.js')(sequelize, Sequelize);
db.memberInterest = require('../model/memberInterest.model.js')(sequelize, Sequelize);
db.memberInvoice = require('../model/memberInvoice.model.js')(sequelize, Sequelize);
db.memberPersonalInfo = require('../model/memberPersonalInfo.model.js')(sequelize, Sequelize);
db.memberReferralInfo = require('../model/memberReferralInfo.model.js')(sequelize, Sequelize);
db.memberWorkDetail = require('../model/memberWorkDetail.model.js')(sequelize, Sequelize);

db.project = require('../model/projects.model.js')(sequelize, Sequelize);
db.projectImages = require('../model/projectImages.model.js')(sequelize, Sequelize);
db.aboutUs = require('../model/aboutUs.model.js')(sequelize, Sequelize);


db.member.belongsTo(db.user, {
    foreignKey: "createdBy",
});
db.user.hasMany(db.member, {
    foreignKey: "createdBy",
});
db.memberAddress.belongsTo(db.member, {
    foreignKey: "memberId",
});
db.member.hasMany(db.memberAddress, {
    foreignKey: "memberId",
});
db.memberCardInfo.belongsTo(db.member, {
    foreignKey: "memberId",
});
db.member.hasOne(db.memberCardInfo, {
    foreignKey: "memberId",
});
db.memberCardDelivery.belongsTo(db.memberCardInfo, {
    foreignKey: "cardId",
});
db.memberCardInfo.hasOne(db.memberCardDelivery, {
    foreignKey: "cardId",
});
db.memberImages.belongsTo(db.member, {
    foreignKey: "memberId",
});
db.member.hasMany(db.memberImages, {
    foreignKey: "memberId",
});
db.memberImages.belongsTo(db.user, {
    foreignKey: "createdBy",
});
db.user.hasMany(db.memberImages, {
    foreignKey: "createdBy",
});
db.memberInterest.belongsTo(db.member, {
    foreignKey: "memberId",
});
db.member.hasMany(db.memberInterest, {
    foreignKey: "memberId",
});
db.memberInvoice.belongsTo(db.member, {
    foreignKey: "memberId",
});
db.member.hasMany(db.memberInvoice, {
    foreignKey: "memberId",
});
db.memberPersonalInfo.belongsTo(db.member, {
    foreignKey: "memberId",
});
db.member.hasOne(db.memberPersonalInfo, {
    foreignKey: "memberId",
});
db.memberReferralInfo.belongsTo(db.member, {
    foreignKey: "memberId",
});
db.member.hasMany(db.memberReferralInfo, {
    foreignKey: "memberId",
});
db.memberWorkDetail.belongsTo(db.member, {
    foreignKey: "memberId",
});
db.member.hasOne(db.memberWorkDetail, {
    foreignKey: "memberId",
});
// --------------------------------------------------------
db.projectImages.belongsTo(db.project, {
    foreignKey: "projectId",
});
db.project.hasMany(db.projectImages, {
    foreignKey: "projectId",
});
db.projectImages.belongsTo(db.aboutUs, {
    foreignKey: "aboutUsId",
});
db.aboutUs.hasMany(db.projectImages, {
    foreignKey: "aboutUsId",
});
module.exports = db;