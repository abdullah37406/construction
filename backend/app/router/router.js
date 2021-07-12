const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {
    const controller = require('../controller/controller.js');

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');

        next();
    });

    app.post('/api/auth/signin', controller.signin);
    app.post('api/auth/signup', [authJwt.verifyToken, verifySignUp.checkDuplicateEmail], controller.signup);
    app.post("/api/member/create", [authJwt.verifyToken], controller.createMemberRecord); //[authJwt.verifyToken],
    app.post("/api/member/update", [authJwt.verifyToken], controller.updateMemberRecord); //[authJwt.verifyToken],
    app.get("/api/memberno/get", [authJwt.verifyToken], controller.getMembersNo); //[authJwt.verifyToken],
    app.post("/api/memberProfileImg/add", [authJwt.verifyToken], controller.addProfileImage); //[authJwt.verifyToken],
    app.get("/api/memberCnicNo/get", [authJwt.verifyToken], controller.getMemberCnicNo); //[authJwt.verifyToken],
    app.post("/api/memberCnicImg/add", [authJwt.verifyToken], controller.addCnicImage); //[authJwt.verifyToken],
    app.post("/api/template/add", [authJwt.verifyToken], controller.addTemplates); //[authJwt.verifyToken],
    app.get("/api/:offset/:limit/members", [authJwt.verifyToken], controller.getAllMembers); //[authJwt.verifyToken],
    app.post('/api/viewMemberData', [authJwt.verifyToken], controller.viewMembersData);
    app.post("/api/cardInfo/add", [authJwt.verifyToken], controller.updateCardInfo); //[authJwt.verifyToken],
    
    app.post("/api/aboutUs/get",  controller.getAboutUsInfo);
    app.post("/api/aboutUs/upload",  controller.addAboutUsInfo);
    app.post("/api/getOneProject",  controller.getOneProjects);
    app.get("/api/allProjects", controller.getAllProjects); //[authJwt.verifyToken],
    app.post("/api/project/upload",  controller.addProject);
}