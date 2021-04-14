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
                //gradSemester: req.body.gradSemester,
                //gradYear: req.body.gradYear,
                nSemestersInProgram: user.nSemestersInProgram,
                //gpa: req.body.gpa,
                //totalCredits: req.body.totalCredits,
                //projectOption: req.body.projectOption,
                //advisor: req.body.advisor,
                //hasGraduated: req.body.hasGraduated
                email: user.email,
                departmentID: user.departmentID
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
      {firstName:req.body.data.firstName,
      lastName: req.body.data.lastName},
      {where: { email: req.body.username }}
      ).then(user => {
          if (!user) {
              return res.status(404).send({ message: "Student Not found." });
            }     
          const student = {
              studentID: user.studentID,
              firstName: req.body.data.firstName,
              lastName: req.body.data.lastName,
              //requirementID: req.body.requirementID,
              entrySemester: user.entrySemester,
              entryYear: user.entryYear,
              //gradSemester: req.body.gradSemester,
              //gradYear: req.body.gradYear,
              nSemestersInProgram: user.nSemestersInProgram,
              //gpa: req.body.gpa,
              //totalCredits: req.body.totalCredits,
              //projectOption: req.body.projectOption,
              //advisor: req.body.advisor,
              //hasGraduated: req.body.hasGraduated
              email: user.email,
              departmentID: user.departmentID
          };  
          res.status(200).send(student);  
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Error has occured while finding Student"
          });
      });
};
