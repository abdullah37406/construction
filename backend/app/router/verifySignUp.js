const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Admin = db.user;

checkDuplicateEmail = (req, res, next) => {
    Admin.findOne({
        where: {
            email: req.body.email
        }
    }).then(admin => {
        if (admin) {
            res.status(400).send("Email is already in use");
            return;
        }
        next();
    })
}

const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;

module.exports = signUpVerify;