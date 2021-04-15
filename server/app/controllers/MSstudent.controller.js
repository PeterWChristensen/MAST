const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

exports.getinfo = (req, res) => {
  console.log("getinfo at Controller.");  
  console.log(req.body);
    Student.findOne({
        where: {
            email: req.body.username
          }
        })
          .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Student Not found." });
              }
                    
            const student = {
                studentID: user.studentID,
                firstName: user.firstName,
                lastName: user.lastName,
                //requirementID: req.body.requirementID,
                entrySemester: user.entrySemester,
                entryYear: user.entryYear,
                gradSemester: user.gradSemester,
                gradYear: user.gradYear,
                nSemestersInProgram: user.nSemestersInProgram,
                gpa: user.gpa,
                totalCredits: user.totalCredits,
                projectOption: user.projectOption,
                advisor: user.advisor,
                hasGraduated: user.hasGraduated,
                email: user.email,
                departmentID: user.departmentID,
                track: user.track,
                requirementVersionYear: user.requirementVersionYear,
                requirementVersionSemester: user.requirementVersionSemester
                
            };  
            res.status(200).send(student);  
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error has occured while finding Student"
            });
        });
};


exports.updateinfo = (req, res) => {
  console.log("updateinfo at Controller.");  
  console.log(req.body);
  Student.update(
      {
      studentID: req.body.data.studentID,
      firstName:req.body.data.firstName,
      lastName: req.body.data.lastName,
      entrySemester: req.body.data.entrySemester,
      entryYear: req.body.data.entryYear,
      gradSemester: req.body.data.gradSemester,
      gradYear: req.body.data.gradYear,
      nSemestersInProgram: req.body.data.nSemestersInProgram,
      gpa: req.body.data.gpa,
      totalCredits: req.body.data.totalCredits,
      projectOption: req.body.data.projectOption,
      advisor: req.body.data.advisor,
      hasGraduated: req.body.data.hasGraduated,
      email: req.body.data.email,
      track: req.body.data.track,
      departmentID: req.body.data.departmentID,
      requirementVersionYear: req.body.data.requirementVersionYear,
      requirementVersionSemester: req.body.data.requirementVersionSemester
    },
      {where: { email: req.body.username }}
      ).then(user => {
          if (!user) {
              return res.status(404).send({ message: "Student Not found." });
            }   
            
          const student = {
            studentID: req.body.data.studentID,
            firstName:req.body.data.firstName,
            lastName: req.body.data.lastName,
            entrySemester: req.body.data.entrySemester,
            entryYear: req.body.data.entryYear,
            gradSemester: req.body.data.gradSemester,
            gradYear: req.body.data.gradYear,
            nSemestersInProgram: req.body.data.nSemestersInProgram,
            gpa: req.body.data.gpa,
            totalCredits: req.body.data.totalCredits,
            projectOption: req.body.data.projectOption,
            advisor: req.body.data.advisor,
            hasGraduated: req.body.data.hasGraduated,
            email: req.body.data.email,
            track: req.body.data.track,
            departmentID: req.body.data.departmentID,
            requirementVersionYear: req.body.data.requirementVersionYear,
            requirementVersionSemester: req.body.data.requirementVersionSemester
          };  
          res.status(200).send(student);  
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Error has occured while finding Student"
          });
      });
};
