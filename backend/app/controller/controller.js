const db = require('../config/db.config.js');
const config = require('../config/config.js');
var fs = require('fs');
var fsd = require('fs')
var FlakeId = require('flake-idgen');
var flakeIdGen = new FlakeId();
var intformat = require('biguint-format');

const User = db.user;
const Member = db.member;
const MemberAddress = db.memberAddress;
const MemberInterest = db.memberInterest;
const MemberPersonal = db.memberPersonalInfo;
const MemberReferral = db.memberReferralInfo;
const MemberWork = db.memberWorkDetail;
const MemberImage = db.memberImages;
const Template= db.template;
const MemberCardInfo= db.memberCardInfo;

const Project = db.project;
const projectImages =db.projectImages;
const AboutUs = db.aboutUs;
const Expertise = db.expertise;
const ExpertiseDetails = db.expertiseDetails;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { sequelize, expertise } = require('../config/db.config.js');

exports.signup = (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(() => {
        res.send({
            message: 'Registered Successfully!'
        });
    }).catch(err => {
        res.status(500).send({
            reason: err.message
        });
    })
}
exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                reason: 'Incorrect Email or Password'
            });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(404).send({
                reason: 'Incorrect Email or Password'
            });
        }
        var token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({
            auth: true,
            accessToken: token,
            email: user.email,
            name: user.name,
            type: user.type
        });
    }).catch(err => {
        res.status(500).send({
            reason: err.message
        });
    })
}
exports.addProject = (req, res) => {
    Project.create({
        projName:req.body.projName,
        projDescription:req.body.projDescription,
        clientName:req.body.clientName,
        clientContact:req.body.clientContact,
        projDetail:req.body.projDetail,
        projCategory:req.body.projCategory,
        projName:req.body.projName,
        createdBy: '1'
    }).then((project) => {
        newfileNames = [];
        const files = req.body.imageData;
        var memberMediaData = [];
        files.forEach((data, index) => {
            var fileName = fileUpload(data.file, data.imgPath);
            if (fileName != "Error") {
                var mediaFile = {
                    projectId: project.id,
                    imgPath: fileName,
                    type: data.type,
                    createdBy: '1'
                };
                memberMediaData.push(mediaFile);
            }
        });
        projectImages.bulkCreate(memberMediaData);
        res.status(200).send({
            msg:"Project Added"
        });
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
}
exports.getAllProjects = (req, res) => {
    Project.findAll({
            include: [{
                model: projectImages,
                required: true,
                attributes: ["imgPath"],
                where: {
                    type: "Icon",
                }
            }]
    }).then((projectsData)=>{
        res.status(200).send({
            data: projectsData,
        });
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant get  data',
            error: error.error
        });
    })

};
exports.getOneProjects = (req, res) => {
    Project.findOne({
        where: {
            id: req.body.id,
        },
        include: [{
                model: projectImages,
                required: true,
                where:{
                    projectId:req.body.id
                }
            }
        ]
    }).then((oneProject) => {
        res.status(200).send({
            data: oneProject
        });
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant get specific projects data',
            error: error.error
        });
    })

}
exports.addAboutUsInfo = (req, res) => {
    AboutUs.create({
        detail:req.body.detail,
        type:req.body.type,
        createdBy: '1'
    }).then((aboutUs) => {
        newfileNames = [];
        const files = req.body.imageData;
        var memberMediaData = [];
        files.forEach((data, index) => {
            var fileName = fileUpload(data.file, data.imgPath);
            if (fileName != "Error") {
                var mediaFile = {
                    aboutUsId: aboutUs.id,
                    imgPath: fileName,
                    type: data.type,
                    createdBy: '1'
                };
                memberMediaData.push(mediaFile);
            }
        });
        projectImages.bulkCreate(memberMediaData);
        res.status(200).send({
            msg:"Aboutus Section Updated"
        });
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
}
exports.getAboutUsInfo = (req, res) => {
    AboutUs.findOne({
        attributes:["detail"],
        where: {
            type: req.body.type,
        },
        include: [{
                model: projectImages,
                attributes:["imgPath"],
                required: true,
                where:{
                    type:req.body.type
                }
            }
        ]
    }).then((aboutusInfo) => {
        res.status(200).send({
            data: aboutusInfo
        });
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant get  data',
            error: error.error
        });
    })

}
exports.addExpertySectionDetail = (req, res) => {
    console.log("--",req.body)
    ExpertiseDetails.create({
        detail:req.body.detail,
        createdBy: '1'
    }).then(() => {
        res.status(200).send({
            msg:"Details Updated"
        });
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
}
exports.updateExpertySectionDetail = (req, res) => {
    ExpertiseDetails.update({
        detail:req.body.detail,
    },{
        where:{
            id:req.body.id,
        }
    }).then(() => {
        res.status(200).send({
            msg:"Details Updated"
        });
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
}
exports.getExpertySectionDetail = (req, res) => {
    ExpertiseDetails.findAll({
    
    }).then((detailData)=>{
        res.status(200).send({
            data: detailData,
        });
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant get  data',
            error: error.error
        });
    })

};
exports.addExperty = (req, res) => {
    Expertise.create({
        type:req.body.type,
        createdBy: '1'
    }).then((experty) => {
        newfileNames = [];
        const files = req.body.imageData;
        var memberMediaData = [];
        files.forEach((data, index) => {
            var fileName = fileUpload(data.file, data.imgPath);
            if (fileName != "Error") {
                var mediaFile = {
                    expertyId: experty.id,
                    imgPath: fileName,
                    //type: data.type,
                    createdBy: '1'
                };
                memberMediaData.push(mediaFile);
            }
        });
        projectImages.bulkCreate(memberMediaData);
        res.status(200).send({
            msg:"Experty Added"
        });
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
}
exports.getAllExpertise = (req, res) => {
    Expertise.findAll({
        include: [{
            model: projectImages,
            attributes:["imgPath","expertyId"],
            required: true,
        }
    ]
    }).then((expertiseData)=>{
        res.status(200).send({
            data: expertiseData,
        });
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant get  data',
            error: error.error
        });
    })

};
exports.showExpertyProjects = (req, res) => {
    console.log("llllllllll",req.params)
    Project.findAll({
        where:{
            projCategory:req.params.data
        },
        include: [{
            model: projectImages,
            attributes:["imgPath","expertyId"],
            required: true,
        }
    ]
    }).then((expertiseData)=>{
        res.status(200).send({
            data: expertiseData,
        });
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant get  data',
            error: error.error
        });
    })

};


exports.createMemberRecord = (req, res) => {
    Member.create({
        membershipNo: req.body.membershipNo,
        name: req.body.name,
        email: req.body.email,
        personalNo: req.body.personalNo,
        type: req.body.type,
        typeNo: req.body.typeNo,
        mailingAddress: req.body.mailingAddress,
        category: req.body.category,
        status: req.body.status,
        createdBy: req.userId
    }).then((member) => {
        MemberPersonal.create({
            cnic: req.body.personalInfo.cnic,
            fatherName: req.body.personalInfo.fatherName,
            motherName: req.body.personalInfo.motherName,
            otherName: req.body.personalInfo.otherName,
            gender: req.body.personalInfo.gender,
            nationality: req.body.personalInfo.nationality,
            relationshipStatus: req.body.personalInfo.relationshipStatus,
            dateOfBirth: req.body.personalInfo.dateOfBirth,
            alternativePhone: req.body.personalInfo.alternativePhone,
            memberId: member.id
        });
        MemberWork.create({
            memberId: member.id,
            qualification: req.body.workDetailInfo.qualification,
            profession: req.body.workDetailInfo.profession,
            designation: req.body.workDetailInfo.designation,
            organization: req.body.workDetailInfo.organization,
        });

        req.body.interestInfo.forEach(element => {
            element.memberId = member.id;
        });
        MemberInterest.bulkCreate(req.body.interestInfo);

        if (req.body.addressInfo.length > 0) {
            req.body.addressInfo.forEach(element => {
                element.memberId = member.id;
            });
            MemberAddress.bulkCreate(req.body.addressInfo);
        }
        if (req.body.referralInfo.length > 0) {
            req.body.referralInfo.forEach(element => {
                element.memberId = member.id;
            });
            MemberReferral.bulkCreate(req.body.referralInfo);
        }

        res.send({
            msg: "Member data added",
            data: member
        });
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
};
exports.updateMemberRecord = (req, res) => {
    //console.log("==", req.body)
    Member.update({
        // invoiceNo: req.body.invoiceNo,
        membershipNo: req.body.membershipNo,
        name: req.body.name,
        email: req.body.email,
        personalNo: req.body.personalNo,
        type: req.body.type,
        typeNo: req.body.typeNo,
        mailingAddress: req.body.mailingAddress,
        category: req.body.category,
        status: req.body.status,
        createdBy: req.userId
    }, {
        where: {
            id: req.body.id,
        },
    }).then((member) => {
        MemberPersonal.update({
            cnic: req.body.personalInfo.cnic,
            fatherName: req.body.personalInfo.fatherName,
            motherName: req.body.personalInfo.motherName,
            otherName: req.body.personalInfo.otherName,
            gender: req.body.personalInfo.gender,
            nationality: req.body.personalInfo.nationality,
            relationshipStatus: req.body.personalInfo.relationshipStatus,
            dateOfBirth: req.body.personalInfo.dateOfBirth,
            alternativePhone: req.body.personalInfo.alternativePhone,
        }, {
            where: {
                memberId: req.body.id,
            },
        });
        MemberWork.update({
            qualification: req.body.workDetailInfo.qualification,
            profession: req.body.workDetailInfo.profession,
            designation: req.body.workDetailInfo.designation,
            organization: req.body.workDetailInfo.organization,
        }, {
            where: {
                memberId: req.body.id,
            },
        });
        var interestData = JSON.parse(JSON.stringify(req.body.interestInfo));
        MemberInterest.bulkCreate(interestData, {
            updateOnDuplicate: ['memberId', 'interest']
        });
        if (req.body.referralInfo.length > 0) {
            if (req.body.referralInfo[0].counter == 0) {
                req.body.referralInfo.forEach(element => {
                    element.memberId = req.body.id;
                });
                MemberReferral.bulkCreate(req.body.referralInfo);
            } else if (req.body.referralInfo[0].counter == 1) {
                MemberReferral.bulkCreate(req.body.referralInfo, {
                    updateOnDuplicate: ['id', 'memberId', 'refMemberNo', 'refName']
                });
            } else if (req.body.referralInfo[0].counter == 2) {
                MemberReferral.destroy({
                    where: {
                        memberId: req.body.id
                    }
                })
            } else if (req.body.referralInfo[0].counter == 3) {
                MemberReferral.destroy({
                    where: {
                        memberId: req.body.id
                    }
                })
                req.body.referralInfo.forEach(element => {
                    element.memberId = req.body.id;
                });
                MemberReferral.bulkCreate(req.body.referralInfo);
            } else if (req.body.referralInfo[1].counter == 1) {
                const files = req.body.referralInfo;
                files.forEach(data => {
                    MemberReferral.bulkCreate(req.body.referralInfo, {
                        updateOnDuplicate: ['id', 'memberId', 'refMemberNo', 'refName']
                    });
                })
            }
        }
        if (req.body.addressInfo.length > 0) {
            if (req.body.addressInfo[0].counter == 0) {

                if (req.body.addressInfo.length > 0) {
                    req.body.addressInfo.forEach(element => {
                        element.memberId = req.body.id;
                    });
                    MemberAddress.bulkCreate(req.body.addressInfo);
                }
            } else if (req.body.addressInfo[0].counter == 1) {
                MemberAddress.bulkCreate(req.body.addressInfo, {
                    updateOnDuplicate: ['id', 'houseNo', 'streetNo', 'area', 'town', 'district', 'city', 'state', 'country', 'Phone', 'type', 'memberId']

                });
            } else if (req.body.addressInfo[0].counter == 3) {
                const files = req.body.addressInfo;
                files.forEach(data => {
                    if (data.type == 'Business') {
                        MemberAddress.bulkCreate(req.body.addressInfo, {
                            updateOnDuplicate: ['id', 'houseNo', 'streetNo', 'area', 'town', 'district', 'city', 'state', 'country', 'Phone', 'type', 'memberId']

                        });
                    } else {
                        req.body.addressInfo.forEach(element => {
                            element.memberId = req.body.id;
                        });
                        MemberAddress.bulkCreate(req.body.addressInfo);
                    }
                })
            } else if (req.body.addressInfo[0].counter == 5) {
                MemberAddress.destroy({
                    where: {
                        memberId: req.body.id
                    }
                })
                req.body.addressInfo.forEach(element => {
                    element.memberId = req.body.id;
                });
                MemberAddress.bulkCreate(req.body.addressInfo);

            } else if (req.body.addressInfo[0].counter == 9) {
                MemberAddress.destroy({
                    where: {
                        memberId: req.body.id
                    }
                })
            } else if ((req.body.addressInfo[0].counter == 2) || (req.body.addressInfo[1].counter == 2)) {
                const files = req.body.addressInfo;
                files.forEach(data => {
                    if (data.counter == 2) {
                        MemberAddress.bulkCreate(req.body.addressInfo, {
                            updateOnDuplicate: ['id', 'houseNo', 'streetNo', 'area', 'town', 'district', 'city', 'state', 'country', 'Phone', 'type', 'memberId']

                        });
                    } else {
                        req.body.addressInfo.forEach(element => {
                            element.memberId = req.body.id;
                        });
                        MemberAddress.bulkCreate(req.body.addressInfo);
                    }
                })
            }
        }
        if (req.body.imageData.length > 0) {
            if (req.body.imageData[0].counter == 0) {
                if (req.body.imageData[0].type == 'Profile') {
                    newfileNames = [];
                    const files = req.body.imageData;
                    Member.findOne({
                            where: {
                                id: req.body.id
                            }
                        }).then((member) => {
                            var memberMediaData = [];
                            files.forEach((data, index) => {
                                var fileName = fileUpload(data.file, data.imgPath);
                                if (fileName != "Error") {
                                    var mediaFile = {
                                        memberId: member.id,
                                        imgPath: fileName,
                                        type: "Profile",
                                        createdBy: req.userId
                                    };
                                    memberMediaData.push(mediaFile);
                                }
                            });
                            MemberImage.bulkCreate(memberMediaData);
                            // res.send({
                            //     msg: "Profile Picture Added",
                            // });
                        })
                        //.catch((err) => {
                        //     console.log("error2")
                        //     res.status(500).send({
                        //         reason: err.message,
                        //     });
                        // });
                }
                if (req.body.imageData[0].type == 'BFrom') {
                    newfileNames = [];
                    const files = req.body.imageData;
                    Member.findOne({
                            where: {
                                id: req.body.id
                            }
                        }).then((member) => {
                            var memberMediaData = [];
                            files.forEach((data, index) => {
                                var fileName = fileUpload(data.file, data.imgPath);
                                if (fileName != "Error") {
                                    var mediaFile = {
                                        memberId: member.id,
                                        imgPath: fileName,
                                        type: "BFrom",
                                        createdBy: req.userId
                                    };
                                    memberMediaData.push(mediaFile);
                                }
                            });
                            MemberImage.bulkCreate(memberMediaData);
                            // res.send({
                            //     msg: "B-Form Picture Added",
                            // });
                        })
                        // .catch((err) => {
                        //     console.log("error3")
                        //     res.status(500).send({
                        //         reason: err.message,
                        //     });
                        // });
                }
                if (req.body.imageData[0].type == 'CNIC') {
                    newfileNames = [];
                    const files = req.body.imageData;
                    Member.findOne({
                            where: {
                                id: req.body.id
                            }
                        }).then((member) => {
                            var memberMediaData = [];
                            files.forEach((data, index) => {
                                var fileName = fileUpload(data.file, data.imgPath);
                                if (fileName != "Error") {
                                    var mediaFile = {
                                        memberId: member.id,
                                        imgPath: fileName,
                                        type: "CNIC",
                                        createdBy: req.userId
                                    };
                                    memberMediaData.push(mediaFile);
                                }
                            });
                            MemberImage.bulkCreate(memberMediaData);
                            // res.send({
                            //     msg: "CNIC Picture Added",
                            // });
                        })
                        // .catch((err) => {
                        //     console.log("error4")
                        //     res.status(500).send({
                        //         reason: err.message,
                        //     });
                        // });
                }
            } else if (req.body.imageData[0].counter == 1) {
                if (req.body.imageData[0].type == 'Profile') {
                    newfileNames = [];
                    const files = req.body.imageData;
                    var memberMediaData = [];
                    files.forEach((data, index) => {

                        var abc = fileDelete(data.oldPath);

                        var fileName = fileUpload(data.file, data.imgPath);
                        if (fileName != "Error") {
                            var mediaFile = {
                                id: data.id,
                                memberId: req.body.id,
                                imgPath: fileName,
                                type: "Profile",
                                createdBy: req.userId,
                                value: null
                            };
                            memberMediaData.push(mediaFile);
                        }

                    });
                    MemberImage.bulkCreate(memberMediaData, {
                        updateOnDuplicate: ['memberId', 'imgPath', 'value', 'type', 'createdBy']
                    });
                    // res.send({
                    //     msg: "Profile Picture Updated",
                    // });
                }
                if (req.body.imageData[0].type == 'BFrom') {
                    newfileNames = [];
                    const files = req.body.imageData;
                    var memberMediaData = [];
                    files.forEach((data, index) => {

                        var abc = fileDelete(data.oldPath);

                        var fileName = fileUpload(data.file, data.imgPath);
                        if (fileName != "Error") {
                            var mediaFile = {
                                id: data.id,
                                memberId: req.body.id,
                                imgPath: fileName,
                                type: "BFrom",
                                createdBy: req.userId,
                                value: null
                            };
                            memberMediaData.push(mediaFile);
                        }
                    });
                    MemberImage.bulkCreate(memberMediaData, {
                        updateOnDuplicate: ['memberId', 'imgPath', 'value', 'type', 'createdBy']
                    });
                    // res.send({
                    //     msg: "B-Form Picture Updated",
                    // });
                }
                if (req.body.imageData[0].type == 'CNIC') {
                    newfileNames = [];
                    const files = req.body.imageData;
                    var memberMediaData = [];
                    files.forEach((data, index) => {

                        var abc = fileDelete(data.oldPath);

                        var fileName = fileUpload(data.file, data.imgPath);
                        if (fileName != "Error") {
                            var mediaFile = {
                                id: data.id,
                                memberId: req.body.id,
                                imgPath: fileName,
                                type: "CNIC",
                                createdBy: req.userId,
                                value: null
                            };
                            memberMediaData.push(mediaFile);
                        }
                    });
                    MemberImage.bulkCreate(memberMediaData, {
                        updateOnDuplicate: ['memberId', 'imgPath', 'value', 'type', 'createdBy']
                    });
                    // res.send({
                    //     msg: "Cnic Picture Updated",
                    // });
                }
            } else if (req.body.imageData[0].counter == 2) {
                newfileNames = [];
                const files = req.body.imageData;
                var memberMediaData = [];
                files.forEach((data, index) => {
                    if (data.type == 'CNIC') {
                        var abc = fileDelete(data.oldPath);
                        MemberImage.destroy({
                            where: {
                                id: data.id
                            }
                        })
                    }
                    if (data.type == 'BFrom') {
                        var fileName = fileUpload(data.file, data.imgPath);
                        if (fileName != "Error") {
                            var mediaFile = {
                                memberId: req.body.id,
                                imgPath: fileName,
                                type: "BFrom",
                                createdBy: req.userId
                            };
                            memberMediaData.push(mediaFile);
                        }
                    }
                });
                MemberImage.bulkCreate(memberMediaData);
                // res.send({
                //     msg: " Picture Added",
                // });
            } else if (req.body.imageData[0].counter == 3) {
                console.log("llllll")
                newfileNames = [];
                const files = req.body.imageData;
                var memberMediaData = [];
                files.forEach((data, index) => {
                    if (data.type == 'BFrom') {
                        var abc = fileDelete(data.oldPath);
                        MemberImage.destroy({
                            where: {
                                id: data.id
                            }
                        })
                    }
                    if (data.type == 'CNIC') {
                        var fileName = fileUpload(data.file, data.imgPath);
                        if (fileName != "Error") {
                            var mediaFile = {
                                memberId: req.body.id,
                                imgPath: fileName,
                                type: "CNIC",
                                createdBy: req.userId
                            };
                            memberMediaData.push(mediaFile);
                        }
                    }
                });
                MemberImage.bulkCreate(memberMediaData);
                // res.send({
                //     msg: " Picture Added",
                // });
            }
        }
        res.send({
            msg: "Member data Updated",
            data: member
        });
    }).catch((err) => {
        console.log("error1")
        res.status(500).send({
            reason: err.message,
        });
    });
};
exports.getMemberCnicNo = (req, res) => {
    MemberPersonal.findAll({
        attributes: ["cnic"],
    }).then((member) => {
        res.send(member);
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
};

exports.getMembersNo = (req, res) => {
    Member.findAll({
        attributes: ["id", "membershipNo", "name","type"],
    }).then((member) => {
        res.send(member);
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
};

function fileUpload(file, name) {
    const base64data = file.replace(/^data:.*,/, '');
    const fileName = intformat(flakeIdGen.next(), 'dec').toString() + name.replace(/\s+/g, ' ').trim();
    try {
        fs.writeFileSync('uploads/profilePicture/' + fileName, base64data, 'base64'); //'a+' is append mode 
        return fileName;
    } catch (err) {
        return "Error";
    }
};
function templateUpload(file, name) {
    const base64data = file.replace(/^data:.*,/, '');
    const fileName = intformat(flakeIdGen.next(), 'dec').toString() + name.replace(/\s+/g, ' ').trim();
    try {
        fs.writeFileSync('uploads/templates/' + fileName, base64data, 'base64'); //'a+' is append mode 
        return fileName;
    } catch (err) {
        return "Error";
    }
};
function fileDelete(name) {
    try {
        fs.unlinkSync('uploads/profilePicture/' + name); //'a+' is append mode 
        return name;
    } catch (err) {
        return err;
    }
};

exports.addProfileImage = (req, res) => {
    newfileNames = [];
    const files = req.body.imageData;
    Member.findOne({
        where: {
            id: req.body.id
        }
    }).then((member) => {
        var memberMediaData = [];
        files.forEach((data, index) => {
            var fileName = fileUpload(data.file, data.imgPath);
            if (fileName != "Error") {
                var mediaFile = {
                    memberId: member.id,
                    imgPath: fileName,
                    type: "Profile",
                    createdBy: req.userId
                };
                memberMediaData.push(mediaFile);
            }
        });
        MemberImage.bulkCreate(memberMediaData);
        res.send({
            msg: "Profile Picture Added",
        });
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
};

exports.addCnicImage = (req, res) => {
    newfileNames = [];
    const files = req.body.imageData;
    Member.findOne({
        where: {
            membershipNo: req.body.membershipNo
        }
    }).then((member) => {
        var memberMediaData = [];
        files.forEach((data, index) => {
            var fileName = fileUpload(data.file, data.imgPath);
            if (fileName != "Error") {
                var mediaFile = {
                    memberId: member.id,
                    imgPath: fileName,
                    type: data.type,
                    createdBy: req.userId
                };
                memberMediaData.push(mediaFile);
            }
        });
        MemberImage.bulkCreate(memberMediaData);
        res.send({
            msg: "Image(s) Added",
        });
    }).catch((err) => {
        res.status(500).send({
            reason: err.message,
        });
    });
};
exports.addTemplates=(req,res)=>{
    console.log("++",req.body)
    const files = req.body;
    var memberMediaData = [];
    files.forEach((data, index) => {
        var fileName = templateUpload(data.file, data.imgPath);
        if (fileName != "Error") {
            var mediaFile = {
                imgPath: fileName,
                type: data.type,
                createdBy: req.userId
            };
            memberMediaData.push(mediaFile);
        }
    });
    Template.bulkCreate(memberMediaData);
    res.send({
        msg: "Image(s) Added",
    });
}

exports.getAllMembers = (req, res) => {
    Member.findAll({
        attributes:[
            [sequelize.fn('count', sequelize.col('members.id')), 'totalMembers']
        ],        
    }).then((member) => {
        Member.findAll({
            attributes:["id", "membershipNo", "name",],
            limit: parseInt(req.params.limit),
            offset:parseInt(req.params.offset),
            order: [
                    ["id", "ASC"]
                ],
                include: [{
                    model: MemberImage,
                    required: false,
                    attributes: ["id", "memberId", "type", "imgPath"],
                    where: {
                        type: "profile",
                    }
                }]
        }).then((membersData)=>{
            res.status(200).send({
                data: membersData,
                data1:member
            });
        }).catch(()=>{

        })
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant get members data',
            error: error.error
        });
    })

};

exports.viewMembersData = (req, res) => {
    console.log(req.body.id);
    Member.findOne({
        where: {
            id: req.body.id,
        },
        include: [{
                model: MemberImage,
                required: false,

                // attributes: ["type", "imgPath"],

                // where: {
                //     type: "profile",
                //     //    memberId: Member.id,
                // }
            }, {
                model: MemberPersonal,
            },
            {
                model: MemberInterest,
                // attributes: ["interest"],
            }, {
                model: MemberWork,
            },
            {
                model: MemberAddress,
                required: false,
            }, {
                model: MemberReferral,
                required: false,
            }
        ]
    }).then((member) => {
        res.status(200).send({
            data: member
        });
        // console.log("dsd", data);
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant get members data',
            error: error.error
        });
    })

}
exports.updateCardInfo=(req,res)=>{
    MemberCardInfo.create({
        memberId:req.body.memberId,
        type:req.body.type,
        cardNo:req.body.cardNo,
        cardStatus:req.body.cardStatus,
        memberStatus:req.body.memberStatus,
        expiryDate:req.body.expiryDate,
    }).then(()=>{
        res.status(200).send({
            msg:"data enterd"
        });
        // console.log("dsd", data);
    }).catch((error) => {
        res.status(500).send({
            reason: 'Cant enter card data',
            error: error.error
        });
    })
}