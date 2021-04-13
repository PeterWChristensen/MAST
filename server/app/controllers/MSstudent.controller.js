const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

exports.getinfo = (req, res) => {
    
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
